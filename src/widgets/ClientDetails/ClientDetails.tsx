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
  const [newNote, setNewNote] = useState<string>('')

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

  const changeAtributes = (key: keyof Client) => ({
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      handleChange(key, e.target.value),
    onBlur: () => setEditingField(null),
    autoFocus: true,
  })

  const handleSubmitClient = () => {
    setClient(form)
    exit()
  }

  const handleSubmitNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newNote.trim()) return

    const noteToAdd = {
      id: Date.now().toString(),
      content: newNote.trim(),
    }

    setForm((prev) => ({
      ...prev,
      notes: prev.notes ? [noteToAdd, ...prev.notes] : [noteToAdd],
    }))
    setNewNote('')
  }

  return (
    <>
      <Modal isOpen={Boolean(client)} onClose={exit} titleId="client-title" title="Client details">
        <div className={s.client_info}>
          <div className={s.client_info__row} {...editingAtr('name')}>
            <label id="name">Name: </label>
            {editingField === 'name' ? (
              <input type="text" value={form.name} {...changeAtributes('name')} />
            ) : (
              <span>{form.name}</span>
            )}
          </div>
          <div className={s.client_info__row} {...editingAtr('email')}>
            <label>Email: </label>
            {editingField === 'email' ? (
              <input type="text" value={form.email} {...changeAtributes('email')} />
            ) : (
              <span>
                <a href={`mailto:${form.email}`}>{form.email}</a>
              </span>
            )}
          </div>

          <div className={s.client_info__row} {...editingAtr('phone')}>
            <label>Phone: </label>
            {editingField === 'phone' ? (
              <input type="text" value={form.phone} {...changeAtributes('phone')} />
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
                {...changeAtributes('status')}
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
              <input type="text" value={form.amount} {...changeAtributes('amount')} />
            ) : (
              <span>
                <span>{form.amount}</span>
              </span>
            )}
          </div>
          <div className={s.client_info__row} {...editingAtr('comment')}>
            <label>Comment: </label>
            {editingField === 'comment' ? (
              <textarea
                maxLength={100}
                name="comment"
                value={form.comment}
                {...changeAtributes('comment')}
              />
            ) : (
              <span>{form.comment}</span>
            )}
          </div>
        </div>
        <div className={s.client_notes__buttons}>
          <button onClick={handleSubmitClient}>Save</button>
          <button onClick={exit}>Cancel</button>
        </div>
        <button
          className={s.client_notes__show}
          onClick={() => {
            setShowNotes((prev) => !prev)
          }}
        >
          {!showNotes ? `Show notes (${form.notes ? form.notes!.length : '0'})` : 'Hide notes'}
        </button>

        <div className={s.client_notes}>
          <div
            className={cn(s.client_notes__wrapper, {
              [s.show]: showNotes,
            })}
          >
            <form onSubmit={handleSubmitNote} className={s.client__create_note}>
              <label>Notes</label>
              <textarea
                name="createNote"
                placeholder="Write your note here"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <div className={s.client_note__create_buttons}>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setNewNote('')}>
                  Cancel
                </button>
              </div>
            </form>
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
