import { httpClient as client } from '../shared/api/httpClient'
import type { Product } from '../types/product'

export const productService = {
  // все продукты
  getAll: (): Promise<Product[]> => {
    return client.get('products/')
  },

  // удаленные продукты (archive)
  getArchive: (): Promise<Product[]> => {
    return client.get('/products/archive/')
  },

  // один продукт
  getProduct: (id: string): Promise<Product> => {
    return client.get(`/products/${id}/`)
  },

  // создать продукт
  create: (data: Partial<Product>): Promise<Product> => {
    return client.post('/products/', data)
  },

  createWithFile: (data: FormData): Promise<Product> => {
    return client.post('/products/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  // обновить продукт
  update: (id: string, data: Partial<Product>): Promise<Product> => {
    return client.patch(`/products/${id}/`, data)
  },

  // удалить продукт
  delete: (id: string): Promise<void> => {
    return client.delete(`/products/${id}/`)
  },

  // восстановить продукт
  restore: (id: string): Promise<Product> => {
    return client.post(`/products/${id}/restore/`)
  },
}
