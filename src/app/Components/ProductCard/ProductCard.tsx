import type { Product } from '../../../types/product'
import s from './ProductCard.module.scss'
import { BsXCircleFill, BsPencilSquare } from 'react-icons/bs'
import cn from 'classnames'
import { useState } from 'react'
import { EditProductCard } from '../EditProductCard/EditProductCard'
import { ConfirmationDialog } from '../../../shared/ui/ConfirmationDialog/ConfirmationDialog'
import { motion } from 'motion/react'

type Props = {
  indexForMotion: number
  isRemoved?: boolean
  showEditIcons?: boolean
  product: Product
  setTrash: React.Dispatch<React.SetStateAction<Product[]>>
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

export const ProductCard: React.FC<Props> = ({
  indexForMotion,
  isRemoved,
  product,
  showEditIcons,
  setProducts,
  setTrash,
}) => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false)

  const handleDelete = () => {
    setProducts((prev) => prev.filter((item) => item.id !== product.id))
    setTrash((prev) => [product, ...prev])
  }

  const handleDeleteFromTrash = () => {
    setTrash((prev) => prev.filter((item) => item.id !== product.id))
  }
  const editModalOpen = () => {
    setIsEditingModalOpen(true)
  }

  const handleRestore = () => {
    setTrash((prev) => prev.filter((item) => item.id !== product.id))
    setProducts((prev) => [product, ...prev])
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateY: 15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.1 * indexForMotion,
          ease: 'linear',
        }}
        className={cn(s.product_card, {
          [s.product_card__removed]: isRemoved,
        })}
        onClick={editModalOpen}
      >
        <button
          onClick={editModalOpen}
          className={cn(s.edit, {
            [s.show]: showEditIcons,
          })}
        >
          <BsPencilSquare />
        </button>
        <button
          className={cn(s.delete, {
            [s.show]: showEditIcons,
          })}
          onClick={(e) => {
            e.stopPropagation()
            setIsDeleteConfirmOpen(true)
          }}
        >
          <BsXCircleFill />
        </button>
        <div className={s.product_image}>
          <img src={product.image} alt={product.title} />
        </div>
        <div className={s.product_title}>
          <span>{product.title}</span>
        </div>
        <div className={s.product_price}>
          <span>{`Price:`}</span>
          <span>{product.price}$</span>
        </div>
        <div className={s.product_description}>
          <span>{product.description}</span>
        </div>
        {isRemoved && (
          <button className={s.restore_button} onClick={handleRestore}>
            Restore
          </button>
        )}
      </motion.div>
      {isEditingModalOpen && (
        <EditProductCard
          isOpen={isEditingModalOpen}
          product={product}
          saveProduct={setProducts!}
          exit={() => {
            setIsEditingModalOpen(false)
          }}
        />
      )}
      {isDeleteConfirmOpen && (
        <ConfirmationDialog
          isOpen={isDeleteConfirmOpen}
          onClose={() => setIsDeleteConfirmOpen(false)}
          product={product}
          handleDelete={!isRemoved ? handleDelete : handleDeleteFromTrash}
        />
      )}
    </>
  )
}
