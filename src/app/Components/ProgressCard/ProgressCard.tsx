import { useState } from 'react'
import type { Client, ClientStatus } from '../../../types'
import s from './ProgressCard.module.scss'
import cn from 'classnames'
import { ClientCreate } from '../../../widgets/ClientCreate/ClientCreate'
import { ProgressCardList } from './components/ProgressCardList/ProgressCardList'
import { Droppable } from '@hello-pangea/dnd'
import { statusFormat } from '../../../utils/statusFormat'

type Props = {
  clients: Client[]
  columnId: ClientStatus
  setSelectedClient: (client: Client) => void
}

export const ProgressCard: React.FC<Props> = ({ clients, columnId, setSelectedClient }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const status = statusFormat(columnId)

  return (
    <>
      <article className={s.progress_card}>
        <div className={s.progress_card__top_bar}>
          <h2 className={cn('h3', s.progress_card__status)}>{status}</h2>
          {columnId === 'new' && (
            <button
              className={s.progress_card__add_client}
              onClick={() => {
                setIsModalOpen(true)
              }}
            >
              + new client
            </button>
          )}
        </div>
        <Droppable droppableId={columnId}>
          {(provided) => (
            <ProgressCardList
              ref={provided.innerRef}
              {...provided.droppableProps}
              clients={clients}
              columnId={columnId}
              setSelectedClient={setSelectedClient}
            >
              {provided.placeholder}
            </ProgressCardList>
          )}
        </Droppable>
      </article>

      {isModalOpen && <ClientCreate onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
