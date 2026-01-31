import React, { useState } from 'react'
import styles from './ClientCreate.module.scss'
import { Modal } from '../../shared/ui/Modal/Modal'

type Props = {
  onClose: () => void
  isOpen: boolean
}

export const ClientCreate: React.FC<Props> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      name,
      email,
      phone,
      comment,
    }

    console.log('Create client:', payload)

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} titleId="client-title" title="Create client">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <textarea
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

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
