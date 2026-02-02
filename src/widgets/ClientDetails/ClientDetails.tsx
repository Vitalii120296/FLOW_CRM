import React, { useEffect, useState } from 'react'
import type { Client } from '../../types'
import s from './ClientDetails.module.scss'
import cn from 'classnames'
import { statusFormat } from '../../utils/statusFormat'
import { Modal } from '../../shared/ui/Modal/Modal'
import { BsCaretDownFill } from 'react-icons/bs'

type Props = {
  client: Client
  quit: () => void
}

export const ClientDetails: React.FC<Props> = ({ client, quit }) => {
  const [showNotes, setShowNotes] = useState<boolean>(false)
  const [editingField, setEditingField] = useState<keyof Client | null>(null)
  const [form, setForm] = useState<Client>(client)

  useEffect(() => {
    document.body.classList.add('no-scroll')

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])

  const handleChange = <K extends keyof Client>(field: K, value: Client[K]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const editingAtr = (key: keyof Client) => {
    return {
      onDoubleClick: () => {
        setEditingField(key)
      },
      onBlur: () => {
        setEditingField(null)
      },
    }
  }

  const inputAtr = (key: keyof Client) => {
    return {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(key, e.target.value),
      onBlur: () => setEditingField(null),
      autoFocus: true,
    }
  }

  return (
    <>
      <Modal isOpen={Boolean(client)} onClose={quit} titleId="client-title" title="Client details">
        <div className={s.client_info}>
          <div className={s.client_info__row} {...editingAtr('name')}>
            <label>Name: </label>
            {editingField === 'name' ? (
              <input type="text" value={form.name} {...inputAtr('name')} />
            ) : (
              <span>{client.name}</span>
            )}
          </div>
          <div className={s.client_info__row} {...editingAtr('email')}>
            <label>Email: </label>
            {editingField === 'email' ? (
              <input type="text" value={form.email} {...inputAtr('email')} />
            ) : (
              <span>
                <a href={`mailto:${client.email}`}>{client.email}</a>
              </span>
            )}
          </div>

          <div className={s.client_info__row} {...editingAtr('phone')}>
            <label>Phone: </label>
            {editingField === 'phone' ? (
              <input type="text" value={form.phone} {...inputAtr('phone')} />
            ) : (
              <span>
                <a href={`tel:+${client.phone}`}>{client.phone}</a>
              </span>
            )}
          </div>
          <div className={s.client_info__row}>
            <label>Status: </label>
            <span
              className={cn({
                [s.yellow]: client.status === 'in_progress',
                [s.green]: client.status === 'new',
                [s.blue]: client.status === 'done',
              })}
            >
              {statusFormat(client.status)}
            </span>
          </div>
          <div className={s.client_info__row} {...editingAtr('amount')}>
            <label>Amount: </label>
            {editingField === 'amount' ? (
              <input type="text" value={form.amount} {...inputAtr('amount')} />
            ) : (
              <span>
                <span>{client.amount}</span>
              </span>
            )}
          </div>
          <div className={s.client_info__row}>
            <label>Comment: </label>
            <span>{client.comment}</span>
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
              <BsCaretDownFill className="icon" aria-label="hidden" />
              Show all notes
              {client.notes && <span>{client.notes.length}</span>}
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
