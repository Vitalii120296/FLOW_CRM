import React, { useEffect, useState } from 'react'
import type { Client } from '../../types'
import s from './ClientDetails.module.scss'
import { BiSolidError } from 'react-icons/bi'
import cn from 'classnames'
import { statusFormat } from '../../utils/statusFormat'
import { Modal } from '../../shared/ui/Modal/Modal'
import { CLIENT_STATUSES } from '../../shared/constants/constants'

import { getValidationErrorMessage } from '../../types/validationMessages'
import { validateService } from '../../services/validateServices'
import type { ValidationError } from '../../types/ValidationErrorType'
import { clientService } from '../../services/clientServices'

type Props = {
  client: Client
  exit: () => void
  setClient: React.Dispatch<React.SetStateAction<Client>>
}

type FormErrors = {
  first_name?: ValidationError
  last_name?: ValidationError
  email?: ValidationError
  phone?: ValidationError
  comment?: ValidationError
}

export const ClientDetails: React.FC<Props> = ({ client, setClient, exit }) => {
  const [showNotes, setShowNotes] = useState<boolean>(false)
  const [editingField, setEditingField] = useState<keyof Client | null>(null)
  const [form, setForm] = useState<Client>(client)
  const [newNote, setNewNote] = useState<string>('')
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    const fetchNotes = async (id: string) => {
      try {
        const notes = await clientService.getNotes(id)
        setClient((prev) => ({ ...prev, notes }))
        setForm((prev) => ({ ...prev, notes })) // синхронізуємо form.notes
      } catch (error) {
        console.log(error)
      }
    }
    fetchNotes(client.id)
  }, [client.id])

  useEffect(() => {
    setForm(client)
  }, [client])

  //#region Validate
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    const nameError = validateService.validateName(form.first_name ?? '')
    if (nameError) newErrors.first_name = nameError

    const emailError = validateService.validateEmail(form.email ?? '')
    if (emailError) newErrors.email = emailError

    const phoneError = validateService.validatePhone(form.phone ?? '')
    if (phoneError) newErrors.phone = phoneError

    const commentError = validateService.validateComment(form.comment ?? '')
    if (commentError) newErrors.comment = commentError

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  //#endregion

  const handleChange = <K extends keyof Client>(field: K, value: Client[K]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
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

  const handleSubmitClient = async () => {
    if (!validateForm()) return

    try {
      await clientService.updateClient(`${form.id}`, { ...form })
    } catch (error) {
      console.log(error)
    }
    setClient(form)
    exit()
  }

  const handleSubmitNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newNote.trim()) return

    try {
      const createdNote = await clientService.addNote(client.id, {
        id: client.id,
        description: newNote.trim(),
      })

      setForm((prev) => ({
        ...prev,
        notes: prev.notes
          ? [{ id: createdNote.id.toString(), description: createdNote.description }, ...prev.notes]
          : [{ id: createdNote.id.toString(), description: createdNote.description }],
      }))
      setClient((prev) => ({
        ...prev,
        notes: prev.notes
          ? [{ id: createdNote.id.toString(), description: createdNote.description }, ...prev.notes]
          : [{ id: createdNote.id.toString(), description: createdNote.description }],
      }))

      setNewNote('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal isOpen={Boolean(client)} onClose={exit} titleId="client-title" title="Client details">
        <div className={s.client_info}>
          <div className={s.client_info__row} {...editingAtr('first_name')}>
            <label>First name:</label>

            {editingField === 'first_name' ? (
              <input
                type="text"
                value={form.first_name ?? ''}
                {...changeAtributes('first_name')}
                className={errors.first_name ? 'errorInput' : ''}
              />
            ) : (
              <span>{form.first_name}</span>
            )}

            {errors.first_name && (
              <div className="errorContainer">
                <BiSolidError className="errorIcon" />
                <p className="errorText">{getValidationErrorMessage(errors.first_name)}</p>
              </div>
            )}
          </div>

          <div className={s.client_info__row} {...editingAtr('last_name')}>
            <label>Last name:</label>

            {editingField === 'last_name' ? (
              <input
                type="text"
                value={form.last_name ?? ''}
                {...changeAtributes('last_name')}
                className={errors.last_name ? 'errorInput' : ''}
              />
            ) : (
              <span>{form.last_name}</span>
            )}

            {errors.last_name && (
              <div className="errorContainer">
                <BiSolidError className="errorIcon" />
                <p className="errorText">{getValidationErrorMessage(errors.last_name)}</p>
              </div>
            )}
          </div>

          <div className={s.client_info__row} {...editingAtr('email')}>
            <label>Email: </label>

            {editingField === 'email' ? (
              <input
                type="text"
                value={form.email ?? ''}
                {...changeAtributes('email')}
                className={errors.email ? 'errorInput' : ''}
              />
            ) : (
              <span>
                <a href={`mailto:${form.email}`}>{form.email}</a>
              </span>
            )}

            {errors.email && (
              <div className="errorContainer">
                <BiSolidError className="errorIcon" />
                <p className="errorText">{getValidationErrorMessage(errors.email)}</p>
              </div>
            )}
          </div>

          <div className={s.client_info__row} {...editingAtr('phone')}>
            <label>Phone:</label>

            {editingField === 'phone' ? (
              <input
                type="text"
                value={form.phone ?? ''}
                {...changeAtributes('phone')}
                className={errors.phone ? 'errorInput' : ''}
              />
            ) : (
              <span>
                <a href={`tel:+${form.phone}`}>{form.phone}</a>
              </span>
            )}

            {errors.phone && (
              <div className="errorContainer">
                <BiSolidError className="errorIcon" />
                <p className="errorText">{getValidationErrorMessage(errors.phone)}</p>
              </div>
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
            <label>Comment:</label>

            {editingField === 'comment' ? (
              <textarea
                maxLength={100}
                value={form.comment ?? ''}
                {...changeAtributes('comment')}
                className={errors.comment ? 'errorInput' : ''}
              />
            ) : (
              <span>{form.comment}</span>
            )}

            {errors.comment && (
              <div className="errorContainer">
                <BiSolidError className="errorIcon" />
                <p className="errorText">{getValidationErrorMessage(errors.comment)}</p>
              </div>
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
            {form.notes?.length ? (
              form.notes.map((note) => (
                <div key={note.id} className={s.client_notes__row}>
                  {note.description}
                </div>
              ))
            ) : (
              <p>Empty</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
