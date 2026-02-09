import { useEffect, useState } from 'react'
import s from './ProductsPage.module.scss'
import type { Product } from '../../types/product'
import { getProductsTestApi } from '../../shared/api/products.test-api'
import { ProductCard } from '../../app/Components/ProductCard/ProductCard'
import { Loader } from '../../app/Components/Loader/Loader'
import { useNavigate } from 'react-router-dom'

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [showEditIcons, setShowEditIcons] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getProductsTestApi()
      .then((res) => {
        setProducts(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleCreate = () => {
    navigate('create')
  }
  return (
    <section className="page-container">
      <h2 className="h2">Products</h2>
      <div className={s.product_buttons}>
        <button className={s.product_button__create} onClick={handleCreate}>
          + Add product
        </button>
        <button
          className={s.product_button__edit}
          onClick={() => setShowEditIcons((prev) => !prev)}
        >
          Edit
        </button>
      </div>
      {loading && <Loader />}
      <ul className={s.products_list}>
        {products.map((item) => (
          <li key={item.id} className={s.products_item}>
            <ProductCard product={item} showEditIcons={showEditIcons} setProducts={setProducts} />
          </li>
        ))}
      </ul>
    </section>
  )
}
