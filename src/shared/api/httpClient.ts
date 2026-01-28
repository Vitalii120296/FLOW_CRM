import axios, { AxiosError } from 'axios'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})
/*
httpClient.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }

  return request
})
*/

httpClient.interceptors.response.use(
  (res) => res.data,
  (error: AxiosError) => {
    const status = error.response?.status

    switch (status) {
      case 400:
        throw new Error('Bad Request')
      case 401:
        throw new Error('Unauthorized')
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
