import { BsFillCircleFill } from 'react-icons/bs'
import type { Client, ClientStatus } from '../../../../../types'
import s from './ProgressCardList.module.scss'
import cn from 'classnames'
import { Draggable } from '@hello-pangea/dnd'
import React from 'react'

type Props = {
  clients: Client[]
  columnId: ClientStatus
  setSelectedClient: (client: Client) => void
  children?: React.ReactNode
}

export const ProgressCardList = React.forwardRef<HTMLDivElement, Props>(
  ({ clients, columnId, setSelectedClient, children }, ref) => {
    const selectClient = (client: Client) => {
      setSelectedClient(client)
    }

    return (
      <div className={s.progress_card__column} ref={ref}>
        <ul className={s.progress_card__list}>
          {clients.map((client, i) => (
            <Draggable draggableId={client.id} index={i} key={client.id}>
              {(provided, snapshot) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={cn(s.progress_card__client, {
                    [s.isDraggin]: snapshot.isDragging,
                  })}
                  onClick={() => selectClient(client)}
                >
                  <p className={s.progress_card__row}>
                    <BsFillCircleFill
                      aria-hidden="true"
                      className={cn(s.progress_card__icon, {
                        [s['progress_card__icon--green']]: columnId === 'new',
                        [s['progress_card__icon--yellow']]: columnId === 'in_progress',
                        [s['progress_card__icon--blue']]: columnId === 'done',
                      })}
                    />
                    {client.name}
                  </p>
                  {client.email && <p className={s.progress_card__row}>{client.email}</p>}
                  {client.phone && <p className={s.progress_card__row}>{client.phone}</p>}
                  {client.sum && <p className={s.progress_card__row}>{client.sum}</p>}
                  {client.comment && <p className={s.progress_card__row}>{client.comment}</p>}
                </li>
              )}
            </Draggable>
          ))}
          {children}
        </ul>
      </div>
    )
  }
)
