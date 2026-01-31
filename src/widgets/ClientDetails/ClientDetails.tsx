import React, { useEffect, useState } from 'react'
import type { Client } from '../../types'
import s from './ClientDetails.module.scss'
import cn from 'classnames'
import { statusFormat } from '../../utils/statusFormat'
import { Modal } from '../../shared/ui/Modal/Modal'

type Props = {
  client: Client
  quit: () => void
}

export const ClientDetails: React.FC<Props> = ({ client, quit }) => {
  const [showNotes, setShowNotes] = useState<boolean>(false)

  useEffect(() => {
    document.body.classList.add('no-scroll')

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])

  return (
    <>
      <Modal isOpen={Boolean(client)} onClose={quit} titleId="client-title" title="Client details">
        <div className={s.client_info}>
          <div className={s.client_info__row}>
            <label>Name: </label>
            <p>{client.name}</p>
          </div>
          <div className={s.client_info__row}>
            <label>Email: </label>
            <p>
              <a href={`mailto:${client.email}`}>{client.email}</a>
            </p>
          </div>

          <div className={s.client_info__row}>
            <label>Phone: </label>
            <p>
              <a href={`tel:+${client.phone}`}>{client.phone}</a>
            </p>
          </div>
          <div className={s.client_info__row}>
            <label>Status: </label>
            <p
              className={cn({
                [s.yellow]: client.status === 'in_progress',
                [s.green]: client.status === 'new',
                [s.blue]: client.status === 'done',
              })}
            >
              {statusFormat(client.status)}
            </p>
          </div>
          <div className={s.client_info__row}>
            <label>Amount: </label>
            <p>{client.amount}</p>
          </div>
          <div className={s.client_info__row}>
            <label>Comment: </label>
            <p>{client.comment}</p>
          </div>
        </div>
        <div className={s.client_notes}>
          <label>Notes</label>
          <textarea name="createNote" placeholder="Write your note here"></textarea>
          <div className={s.client_notes__buttons}>
            <button className={s.client_notes__create} onClick={() => {}}>
              Create
            </button>
            <button
              className={s.client_notes__show}
              onClick={() => {
                setShowNotes((prev) => !prev)
              }}
            >
              Show all notes
            </button>
          </div>
          <div
            className={cn(s.client_notes__wrapper, {
              [s.show]: showNotes,
            })}
          >
            {client.notes
              ? client.notes.map((note) => (
                  <div key={note.id} className={s.client_notes__row}>
                    {note.content}
                  </div>
                ))
              : 'Empty'}
          </div>
        </div>
      </Modal>
    </>
  )
}
