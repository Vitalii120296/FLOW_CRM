import { Modal } from '../Modal/Modal'
import type { Product } from '../../../types/product'
import s from './ConfirmationDialog.module.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
  product: Product
  handleDelete: () => void
}

export const ConfirmationDialog: React.FC<Props> = ({ isOpen, onClose, product, handleDelete }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="" titleId="delete_product">
        <p>
          Are you sure you want to delete
          <strong> {product.title}</strong>?
          <br />
          This action cannot be undone.
        </p>

        <div className={s.confirm_buttons}>
          <button
            className={s.danger}
            onClick={() => {
              handleDelete()
              onClose()
            }}
          >
            Yes, delete
          </button>

          <button onClick={onClose}>Cancel</button>
        </div>
      </Modal>
    </>
  )
}
