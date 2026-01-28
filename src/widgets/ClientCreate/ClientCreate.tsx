import React, { useState } from 'react'
import styles from './ClientCreate.module.scss'

type Props = {
  onClose: () => void
}

export const ClientCreate: React.FC<Props> = ({ onClose }) => {
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
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className="h3">Create client</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
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
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}
