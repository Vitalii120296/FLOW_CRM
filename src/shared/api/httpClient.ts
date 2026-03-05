import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { authService } from '../../services/authService'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

httpClient.interceptors.response.use(
  (res) => res.data,
  async (error: AxiosError) => {
    const status = error.response?.status
    const originalRequest = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined

    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await authService.refresh()
        // повторюємо оригінальний запит
        return httpClient(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    switch (status) {
      case 400:
        throw new Error('Bad Request')
      case 403:
        throw new Error('Forbidden')
      case 404:
        throw new Error('Not Found')
      case 409:
      case 500:
        throw new Error('Internal Server Error')
      default:
        throw new Error(`Unexpected error: ${status}`)
    }
  }
)
