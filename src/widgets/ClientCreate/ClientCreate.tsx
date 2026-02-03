import React, { useState } from 'react'
import styles from './ClientCreate.module.scss'
import { Modal } from '../../shared/ui/Modal/Modal'

import { getValidationErrorMessage } from '../../types/validationMessages'
import { validateService } from '../../services/validateServices'
import type { ValidationError } from '../../types/ValidationErrorType'
// import { ValidationErrorType } from '../../types/ValidationErrorType'

type Props = {
  onClose: () => void
  isOpen: boolean
}

type FormErrors = {
  name?: ValidationError
  email?: ValidationError
  phone?: ValidationError
  comment?: ValidationError
}

export const ClientCreate: React.FC<Props> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')

  const [errors, setErrors] = useState<FormErrors>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: FormErrors = {}

    // name
    const nameError = validateService.validateName(name)
    if (nameError) {
      newErrors.name = nameError
    }

    // email
    const emailError = validateService.validateEmail(email)
    if (emailError) {
      newErrors.email = emailError
    }

    // phone
    const phoneError = validateService.validatePhone(phone)
    if (phoneError) {
      newErrors.phone = phoneError
    }

    // comment
    const commentError = validateService.validateComment(comment)
    if (commentError) {
      newErrors.comment = commentError
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const payload = { name, email, phone, comment }
    console.log('Create client:', payload)

    onClose()
  }

  const handleChange =
    (field: keyof FormErrors, setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value)
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose} titleId="client-title" title="Create client">
      <form onSubmit={handleSubmit} className={styles.content}>
        <input
          placeholder="Full Name"
          value={name}
          onChange={handleChange('name', setName)}
          className={errors.name ? styles.errorInput : ''}
        />

        {errors.name && (
          <p className={styles.errorText}>{getValidationErrorMessage(errors.name)}</p>
        )}

        <input
          placeholder="Email"
          // type="email"
          value={email}
          onChange={handleChange('email', setEmail)}
          className={errors.email ? styles.errorInput : ''}
        />

        {errors.email && (
          <p className={styles.errorText}>{getValidationErrorMessage(errors.email)}</p>
        )}

        <input
          placeholder="Phone"
          value={phone}
          onChange={handleChange('phone', setPhone)}
          className={errors.phone ? styles.errorInput : ''}
        />

        {errors.phone && (
          <p className={styles.errorText}>{getValidationErrorMessage(errors.phone)}</p>
        )}

        <textarea
          placeholder="Comment"
          value={comment}
          onChange={handleChange('comment', setComment)}
          className={errors.comment ? styles.errorInput : ''}
        />

        {errors.comment && (
          <p className={styles.errorText}>{getValidationErrorMessage(errors.comment)}</p>
        )}

        <div className={styles.actions}>
          <button className={styles.cancel} type="button" onClick={onClose}>
            Cancel
          </button>
          <button className={styles.create_client} type="submit">
            Create
          </button>
        </div>
      </form>
    </Modal>
  )
}
