import type { Product } from '../../types/product'
import defaultProductImage from '../../../public/productImages/defaultProductImage.webp'

const productCards: Product[] = [
  {
    id: '1',
    image: defaultProductImage,
    title: 'iphone',
    price: '239.99',
    description: 'black ',
  },
  {
    id: '2',
    image: defaultProductImage,
    title: 'title',
    price: '239',
    description: 'black swq swqs qws qw qwqsqwsq ws qws wq ',
  },
  {
    id: '3',
    image: defaultProductImage,
    title: 'iphone',
    price: '239',
    description: 'blacks wq wqs wqs qw ',
  },
  {
    id: '4',
    image: defaultProductImage,
    title: 'iphone',
    price: '239',
    description: 'black  swqs w w qw qws qwq ',
  },
  {
    id: '5',
    image: defaultProductImage,
    title: 'iphone',
    price: '239',
    description: 'black swq sq q',
  },
  {
    id: '6',
    image: defaultProductImage,
    title: 'iphone',
    price: '239',
    description: 'black ',
  },
  {
    id: '7',
    image: defaultProductImage,
    title: 'iphone',
    price: '239',
    description: 'black ',
  },
]

export const getProductsTestApi = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productCards)
    }, 500)
  })
}
