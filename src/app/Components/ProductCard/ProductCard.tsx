import type { Product } from '../../../types/product'
import s from './ProductCard.module.scss'
import { BsXCircleFill, BsPencilSquare } from 'react-icons/bs'
import cn from 'classnames'
import { useState } from 'react'
import { EditProductCard } from '../EditProductCard/EditProductCard'

type Props = {
  product: Product
  showEditIcons?: boolean
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>
}

export const ProductCard: React.FC<Props> = ({ product, showEditIcons, setProducts }) => {
  const [isEditing, setIsEditing] = useState<string | null>(null)

  const handleDelete = () => {
    if (!setProducts) return
    setProducts((prev) => prev.filter((item) => item.id !== product.id))
  }

  return (
    <>
      <div className={s.product_card}>
        <button
          onClick={() => {
            setIsEditing(product.id)
          }}
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
          onClick={handleDelete}
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
      </div>
      {isEditing && (
        <EditProductCard
          product={product}
          saveProduct={setProducts!}
          exit={() => setIsEditing(null)}
        />
      )}
    </>
  )
}
