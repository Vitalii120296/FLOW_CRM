import { useEffect, useState } from 'react'
import s from './ProductsPage.module.scss'
import cn from 'classnames'
import type { Product } from '../../types/product'
import { getProductsTestApi } from '../../shared/api/products.test-api'
import { ProductCard } from '../../app/Components/ProductCard/ProductCard'
import { Loader } from '../../app/Components/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { BsPencilSquare, BsTrash3Fill, BsFillBagPlusFill } from 'react-icons/bs'

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [trash, setTrash] = useState<Product[]>([])
  const [showEditIcons, setShowEditIcons] = useState<boolean>(false)
  const [showTrash, setShowTrash] = useState(false)
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

    if (showTrash) {
      getProductsTestApi()
        .then((res) => {
          setTrash(res)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [showTrash])

  const handleCreate = () => {
    navigate('create')
  }

  const handleTrash = () => {
    setShowTrash((prev) => !prev)
  }
  return (
    <section className={`page-container ${s.product_wrapper}`}>
      <h1 className="h2">Products</h1>
      <div className={s.product_buttons}>
        <button className={s.product_button__create} onClick={handleCreate}>
          <span>Add product</span>
          <BsFillBagPlusFill />
        </button>
        <button
          className={cn(s.product_button__edit, {
            [s.active]: showEditIcons,
          })}
          onClick={() => setShowEditIcons((prev) => !prev)}
        >
          <span>Edit</span>
          <BsPencilSquare />
        </button>
        <button
          className={cn(s.product_button__create, {
            [s.active]: showTrash,
          })}
          onClick={handleTrash}
        >
          <span>Deleted</span>
          <BsTrash3Fill />
        </button>
      </div>
      {loading && <Loader />}
      <ul className={s.products_list}>
        {!showTrash
          ? products.map((item, index) => (
              <li key={item.id} className={s.products_item}>
                <ProductCard
                  indexForMotion={index}
                  product={item}
                  setProducts={setProducts}
                  setTrash={setTrash}
                  showEditIcons={showEditIcons}
                />
              </li>
            ))
          : trash.map((item, index) => (
              <li key={item.id} className={s.products_item}>
                <ProductCard
                  indexForMotion={index}
                  isRemoved={true}
                  product={item}
                  showEditIcons={showEditIcons}
                  setTrash={setTrash}
                  setProducts={setProducts}
                />
              </li>
            ))}
      </ul>
    </section>
  )
}
