import { useState } from 'react'

import s from './CreateProductPage.module.scss'
import cn from 'classnames'
import { BiSolidError } from 'react-icons/bi'

import type { Product } from '../../types/product'
import { ProductCard } from '../../app/Components/ProductCard/ProductCard'
import { useProductValidate } from '../../shared/hooks/useProductValidate'

const emptyProduct: Product = {
  id: '',
  image: './public/productImages/defaultProductImage.WebP',
  title: '',
  price: '',
  description: '',
  file: undefined,
}

export const CreateProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product>(emptyProduct)
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState<Partial<Record<keyof Product, boolean>>>({})
  const { hasErrors, errors, validate } = useProductValidate()

  // обробка зміни текстових полів
  const handleChange = (field: keyof Product, value: string) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }))
    validate(field, value)
  }

  const handleTouch = (field: keyof Omit<Product, 'file'>) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validate(field, product[field])
  }

  // обробка вибору файлу
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProduct((prev) => ({ ...prev, image: imageUrl, file }))
    }
  }

  // сабміт на сервер
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product.title || !product.price || !product.description) return

    setLoading(true)

    const formData = new FormData()
    formData.append('title', product.title)
    formData.append('price', String(product.price))
    formData.append('description', product.description)
    if (product.file) formData.append('image', product.file)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to create product')

      const createdProduct = await response.json()
      console.log('Created product:', createdProduct)

      // очищаємо форму
      setProduct(emptyProduct)
      alert('Product created successfully!')
    } catch (err) {
      console.error(err)
      alert('Error creating product')
    } finally {
      setLoading(false)
    }
  }

  const isSuccesInput = (value: keyof Omit<Product, 'file'>) =>
    touched[value] && !errors[value] && product[value].length > 0 ? true : false

  return (
    <div className="page-container">
      <div className={s.create_product__wrapper}>
        <form className={s.form} onSubmit={handleSubmit}>
          <h2 className="h2">Create product</h2>

          <div className={s.file_input_wrapper}>
            <label className={s.custom_file_button} htmlFor="product-image">
              {product.file ? product.file.name : 'Choose image'}
              <input type="file" accept="image/*" onChange={handleFileChange} id="product-image" />
            </label>
          </div>

          <input
            required
            name="title"
            placeholder="Product title"
            value={product.title}
            onFocus={() => handleTouch('title')}
            onChange={(e) => handleChange('title', e.target.value)}
            className={cn({
              ['errorInput']: touched.title && errors.title,
              ['successInput']: isSuccesInput('title'),
            })}
          />
          {errors.title && (
            <div className="errorContainer">
              <BiSolidError className="errorIcon" />

              <p className="errorText">{errors.title}</p>
            </div>
          )}

          <input
            required
            name="price"
            placeholder="Price"
            value={product.price || ''}
            onFocus={() => handleTouch('price')}
            onChange={(e) => handleChange('price', e.target.value)}
            className={cn({
              ['errorInput']: touched.price && errors.price,
              ['successInput']: isSuccesInput('price'),
            })}
          />

          {errors.price && (
            <div className="errorContainer">
              <BiSolidError className="errorIcon" />

              <p className="errorText">{errors.price}</p>
            </div>
          )}

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onFocus={() => handleTouch('description')}
            onChange={(e) => handleChange('description', e.target.value)}
            className={cn({
              ['errorInput']: touched.description && errors.description,
              ['successInput']: isSuccesInput('description'),
            })}
          />

          {errors.description && (
            <div className="errorContainer">
              <BiSolidError className="errorIcon" />

              <p className="errorText">{errors.description}</p>
            </div>
          )}

          <button type="submit" disabled={loading || hasErrors}>
            {loading ? 'Creating...' : 'Create product'}
          </button>
        </form>

        <div className={s.preview}>
          <h3 className="h3">Preview</h3>
          <ProductCard
            setTrash={() => {}}
            setProducts={() => {}}
            indexForMotion={1}
            product={product}
          />
        </div>
      </div>
    </div>
  )
}
