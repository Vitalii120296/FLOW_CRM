export type Product = {
  id: string
  image: string
  title: string
  price: number //NOTE: було стрінг, а в апі числа
  description: string
  file?: File
}
