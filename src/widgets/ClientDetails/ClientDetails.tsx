import React, { useState } from 'react'
import type { Client } from '../../types'
import s from './ClientDetails.module.scss'
import cn from 'classnames'
import { statusFormat } from '../../utils/statusFormat'
import { Modal } from '../../shared/ui/Modal/Modal'
import { CLIENT_STATUSES } from '../../shared/constants/constants'

type Props = {
  client: Client
  exit: () => void
  setClient: (updatedClient: Client) => void
}

export const ClientDetails: React.FC<Props> = ({ client, setClient, exit }) => {
  const [showNotes, setShowNotes] = useState<boolean>(false)
  const [editingField, setEditingField] = useState<keyof Client | null>(null)
  const [form, setForm] = useState<Client>(client)

  // useEffect(() => {
  //   document.body.classList.add('no-scroll')

  //   return () => {
  //     document.body.classList.remove('no-scroll')
  //   }
  // }, [])

  const handleChange = <K extends keyof Client>(field: K, value: Client[K]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const editingAtr = (key: keyof Client) => {
    return {
      onClick: () => {
        setEditingField(key)
      },
    }
  }

  const inputAtr = (key: keyof Client) => ({
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      handleChange(key, e.target.value),
    onBlur: () => setEditingField(null),
    autoFocus: true,
  })

  const handleClose = () => {
    setClient(form)
    exit()
  }

  return (
    <>
      <Modal
        isOpen={Boolean(client)}
        onClose={handleClose}
        titleId="client-title"
        title="Client details"
      >
        <div className={s.client_info}>
          <div className={s.client_info__row} {...editingAtr('name')}>
            <label id="name">Name: </label>
            {editingField === 'name' ? (
              <input type="text" value={form.name} {...inputAtr('name')} />
            ) : (
              <span>{form.name}</span>
            )}
          </div>
          <div className={s.client_info__row} {...editingAtr('email')}>
            <label>Email: </label>
            {editingField === 'email' ? (
              <input type="text" value={form.email} {...inputAtr('email')} />
            ) : (
              <span>
                <a href={`mailto:${form.email}`}>{form.email}</a>
              </span>
            )}
          </div>

          <div className={s.client_info__row} {...editingAtr('phone')}>
            <label>Phone: </label>
            {editingField === 'phone' ? (
              <input type="text" value={form.phone} {...inputAtr('phone')} />
            ) : (
              <span>
                <a href={`tel:+${form.phone}`}>{form.phone}</a>
              </span>
            )}
          </div>
          <div className={s.client_info__row} {...editingAtr('status')}>
            <label>Status: </label>
            {editingField === 'status' ? (
              <select
                name="client status"
                id="client_status"
                value={form.status}
                {...inputAtr('status')}
              >
                {CLIENT_STATUSES.map((status) => (
                  <option value={status} key={status}>
                    {statusFormat(status)}
                  </option>
                ))}
              </select>
            ) : (
              <span
                className={cn({
                  [s.yellow]: form.status === 'in_progress',
                  [s.green]: form.status === 'new',
                  [s.blue]: form.status === 'done',
                })}
              >
                {statusFormat(form.status)}
              </span>
            )}
          </div>
          <div className={s.client_info__row} {...editingAtr('amount')}>
            <label>Amount: </label>
            {editingField === 'amount' ? (
              <input type="text" value={form.amount} {...inputAtr('amount')} />
            ) : (
              <span>
                <span>{form.amount}</span>
              </span>
            )}
          </div>
          <div className={s.client_info__row} {...editingAtr('comment')}>
            <label>Comment: </label>
            {editingField === 'comment' ? (
              <textarea name="comment" value={form.comment} {...inputAtr('comment')} />
            ) : (
              <span>{form.comment}</span>
            )}
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
              {`Show all notes (${form.notes ? form.notes!.length : ''})`}
            </button>
          </div>
          <div
            className={cn(s.client_notes__wrapper, {
              [s.show]: showNotes,
            })}
          >
            {form.notes
              ? form.notes.map((note) => (
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
