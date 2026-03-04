import React, { useState } from 'react'
import { Modal } from '../../shared/ui/Modal/Modal'

import cn from 'classnames'

import styles from './ClientCreate.module.scss'
import { BiSolidError } from 'react-icons/bi'
import { useClientValidate } from '../../shared/hooks/useClientValidate'
import { clientService } from '../../services/clientServices'
import { useAuth } from '../../app/Components/Contexts/AuthContext'
import type { Client } from '../../types'

type Props = {
  onClose: () => void
  isOpen: boolean
  setClients?: React.Dispatch<React.SetStateAction<Client[]>>
}

type FormData = {
  first_name: string
  last_name: string
  email: string
  phone: string
  comment: string
  status: string
}

export const ClientCreate: React.FC<Props> = ({ isOpen, onClose, setClients }) => {
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    comment: '',
    status: 'new',
  })
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { hasErrors, errors, validate } = useClientValidate()
  const { currentUser } = useAuth()

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    validate(field, value)
  }

  const handleTouch = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validate(field, formData[field])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (hasErrors) return

    setIsSubmitting(true)

    try {
      await clientService.addClient({
        ...formData,
        createdBy: currentUser
          ? { first_name: currentUser.first_name, id: currentUser.id }
          : { first_name: 'Unknown', id: 0 },
      })

      if (setClients) setClients((prev) => [formData as Client, ...prev])
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }

    console.log('Create client:', formData)

    onClose()
  }

  const isSuccesInput = (value: keyof FormData) =>
    touched[value] && !errors[value] && formData[value].length > 0 ? true : false

  return (
    <Modal isOpen={isOpen} onClose={onClose} titleId="client-title" title="Create client">
      <form onSubmit={handleSubmit} className={styles.content}>
        <input
          required
          placeholder="First name"
          value={formData.first_name}
          onFocus={() => handleTouch('first_name')}
          onChange={(e) => handleChange('first_name', e.target.value)}
          className={cn({
            ['errorInput']: touched.first_name && errors.first_name,
            ['successInput']: isSuccesInput('first_name'),
          })}
        />

        {errors.fullName && (
          <div className="errorContainer">
            <BiSolidError className="errorIcon" />

            <p className="errorText">{errors.first_name}</p>
          </div>
        )}

        <input
          required
          placeholder="Last name"
          value={formData.last_name}
          onFocus={() => handleTouch('last_name')}
          onChange={(e) => handleChange('last_name', e.target.value)}
          className={cn({
            ['errorInput']: touched.last_name && errors.last_name,
            ['successInput']: isSuccesInput('last_name'),
          })}
        />

        {errors.fullName && (
          <div className="errorContainer">
            <BiSolidError className="errorIcon" />

            <p className="errorText">{errors.last_name}</p>
          </div>
        )}

        <input
          required
          placeholder="Email"
          type="email"
          value={formData.email}
          onFocus={() => handleTouch('email')}
          onChange={(e) => handleChange('email', e.target.value)}
          className={cn({
            ['errorInput']: touched.email && errors.email,
            ['successInput']: isSuccesInput('email'),
          })}
        />

        {errors.email && (
          <div className="errorContainer">
            <BiSolidError className="errorIcon" />

            <p className="errorText">{errors.email}</p>
          </div>
        )}

        <input
          required
          placeholder="Phone"
          value={formData.phone}
          onFocus={() => handleTouch('phone')}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={cn({
            ['errorInput']: touched.phone && errors.phone,
            ['successInput']: isSuccesInput('phone'),
          })}
        />

        {errors.phone && (
          <div className="errorContainer">
            <BiSolidError className="errorIcon" />

            <p className="errorText">{errors.phone}</p>
          </div>
        )}

        <textarea
          placeholder="Comment"
          value={formData.comment}
          onFocus={() => handleTouch('comment')}
          onChange={(e) => handleChange('comment', e.target.value)}
          className={cn(styles.content_comment, {
            ['errorInput']: touched.comment && errors.comment,
            ['successInput']: isSuccesInput('comment'),
          })}
        />

        {errors.comment && (
          <div className="errorContainer">
            <BiSolidError className="errorIcon" />

            <p className="errorText">{errors.comment}</p>
          </div>
        )}

        <div className={styles.actions}>
          <button
            className={styles.create_client}
            type="submit"
            disabled={isSubmitting || hasErrors}
          >
            Create
          </button>
          <button className={styles.cancel} type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}
