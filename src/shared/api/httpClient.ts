import axios from 'axios'

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

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status

    switch (status) {
      case 401:
        throw new Error('Unauthorized')
        break
      case 403:
        throw new Error('Forbidden')
        break
      case 500:
        throw new Error('Internal Server Error')
        break
    }
    return Promise.reject(error)
  }
)
*/
