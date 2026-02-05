import React, { useEffect } from 'react'
import s from './Modal.module.scss'
import { CloseButton } from '../CloseButton/CloseButton'
import cn from 'classnames'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  titleId?: string
  children: React.ReactNode
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, title, titleId, children }) => {
  useEffect(() => {
    if (!isOpen) return

    document.body.classList.add('no-scroll')

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={s.modal}
      onClick={onClose}
    >
      <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
        <div className={s.modal_title}>
          <h2 className={cn('h2', s.textTitle)} id={titleId}>
            {title}
          </h2>
          <CloseButton onClick={onClose} ariaLabel="Close modal" />
        </div>
        {children}
      </div>
    </div>
  )
}
