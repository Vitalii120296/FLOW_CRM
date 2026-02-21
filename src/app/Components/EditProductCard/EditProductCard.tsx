import { useState } from 'react'
import { Modal } from '../../../shared/ui/Modal/Modal'
import s from './EditProductCard.module.scss'

import type { Product } from '../../../types/product'

type Props = {
  isOpen: boolean
  product: Product
  saveProduct: React.Dispatch<React.SetStateAction<Product[]>>
  exit: () => void
}

export const EditProductCard: React.FC<Props> = ({ isOpen, product, saveProduct, exit }) => {
  const [editProduct, setEditProduct] = useState<Product>({ ...product })
  const [loading, setLoading] = useState(false)

  const handleChange = <K extends keyof Product>(key: K, value: Product[K]) => {
    setEditProduct((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setEditProduct((prev) => ({ ...prev, image: imageUrl, file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product.title || !product.price || !product.description) return

    setLoading(true)

    // const formData = new FormData()
    // formData.append('title', editProduct.title)
    // formData.append('price', String(editProduct.price))
    // formData.append('description', editProduct.description)
    // if (editProduct.file) formData.append('image', editProduct.file)

    try {
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   body: formData,
      // })

      // if (!response.ok) throw new Error('Failed to create product')

      saveProduct((prev) => prev.map((item) => (item.id === editProduct.id ? editProduct : item)))
      exit()
    } catch (err) {
      console.error(err)
      alert('Error editing product')
    } finally {
      setLoading(false)
    }
  }

  const isProductEdited = () => {
    return JSON.stringify(product) === JSON.stringify(editProduct) ? false : true
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={exit} title="Edit product card" titleId="edit_product">
        <form className={s.product_card} onSubmit={handleSubmit}>
          <div className={s.product_image}>
            <img src={editProduct.image} alt={editProduct.title} />
            <label className={s.custom_file_button} htmlFor="product-image">
              {product.file ? product.file.name : 'Choose image'}
              <input type="file" accept="image/*" onChange={handleFileChange} id="product-image" />
            </label>
          </div>
          <div className={s.product_title}>
            <label>
              <span>Title</span>
              <input
                type="text"
                value={editProduct.title}
                onChange={(e) => {
                  handleChange('title', e.target.value)
                }}
              />
            </label>
          </div>
          <div className={s.product_price}>
            <label>
              <span>Price:</span>
              <input
                type="text"
                value={editProduct.price}
                onChange={(e) => {
                  handleChange('price', e.target.value)
                }}
              />
            </label>
          </div>
          <div className={s.product_description}>
            <label htmlFor="description">
              <span>Description:</span>
              <textarea
                id="description"
                rows={4}
                value={editProduct.description}
                onChange={(e) => {
                  handleChange('description', e.target.value)
                }}
              />
            </label>
          </div>
          <div className={s.edit_product_buttons}>
            <button type="submit" disabled={loading || !isProductEdited()}>
              Save
            </button>
            <button onClick={exit}>Cancel</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
