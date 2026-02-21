import React, { useEffect } from 'react'
import s from './Modal.module.scss'
import { CloseButton } from '../CloseButton/CloseButton'
import cn from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'

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

  return (
    <>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={s.modal}
          onClick={onClose}
        >
          <motion.div
            className={s.modal__content}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.2,
              ease: 'easeIn',
            }}
          >
            <div className={s.modal_title}>
              <h2 className={cn('h2', s.textTitle)} id={titleId}>
                {title}
              </h2>
              <CloseButton onClick={onClose} ariaLabel="Close modal" />
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </>
  )
}
