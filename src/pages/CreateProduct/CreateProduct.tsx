import { useState } from 'react'
import s from './CreateProduct.module.scss'
import type { Product } from '../../types/product'
import { ProductCard } from '../../app/Components/ProductCard/ProductCard'

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

  // обробка зміни текстових полів
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }))
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
            name="title"
            placeholder="Product title"
            value={product.title}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            placeholder="Price"
            value={product.price || ''}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create product'}
          </button>
        </form>

        <div className={s.preview}>
          <h3 className="h3">Preview</h3>
          <ProductCard product={product} />
        </div>
      </div>
    </div>
  )
}
