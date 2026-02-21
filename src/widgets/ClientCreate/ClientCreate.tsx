import React, { useState } from 'react'
import { Modal } from '../../shared/ui/Modal/Modal'

import cn from 'classnames'

import styles from './ClientCreate.module.scss'
import { BiSolidError } from 'react-icons/bi'
import { useClientValidate } from '../../shared/hooks/useClientValidate'

type Props = {
  onClose: () => void
  isOpen: boolean
}

type FormData = {
  fullName: string
  email: string
  phone: string
  comment: string
}

export const ClientCreate: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    comment: '',
  })
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { hasErrors, errors, validate } = useClientValidate()

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    validate(field, value)
  }

  const handleTouch = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validate(field, formData[field])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // перевірка всіх полів перед сабмітом
    Object.entries(formData).forEach(([key, value]) => {
      validate(key as keyof FormData, value)
    })

    if (hasErrors) return

    setIsSubmitting(true)

    // тут буде API запит
    console.log('Form submitted:', formData)

    setTimeout(() => {
      setIsSubmitting(false)
    }, 1000)

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
          placeholder="Full name"
          value={formData.fullName}
          onFocus={() => handleTouch('fullName')}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className={cn({
            ['errorInput']: touched.fullName && errors.fullName,
            ['successInput']: isSuccesInput('fullName'),
          })}
        />

        {errors.fullName && (
          <div className="errorContainer">
            <BiSolidError className="errorIcon" />

            <p className="errorText">{errors.fullName}</p>
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
