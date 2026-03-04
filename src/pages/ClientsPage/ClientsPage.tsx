import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Client, ClientFilters, ClientStatus } from '../../types'

import { ClientsFilter } from '../../widgets/ClientsFilter/ClientsFilter'
import { ClientsTable } from '../../widgets/ClientsTable/ClientsTable'
import { Loader } from '../../app/Components/Loader/Loader'

import s from './ClientsPage.module.scss'
import { clientService } from '../../services/clientServices'

export const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)

  const filters: ClientFilters = {
    search: searchParams.get('search') ?? '',
    status: (searchParams.get('status') as ClientStatus) ?? 'all',
  }

  // 2️⃣ загружаем клиентов (тестовый API)
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true)
        const res = await clientService.getAll()
        setClients(res)
        console.log(res)
      } catch (error) {
        console.error('Failed to load clients:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch = client.first_name
        .toLowerCase()
        .includes(filters.search?.toLowerCase() ?? '')

      const matchesStatus = filters.status === 'all' || client.status === filters.status

      return matchesSearch && matchesStatus
    })
  }, [clients, filters.search, filters.status])

  // NOTE використовуємо page-container клас для сторінки (у міксинах є стилі для нього)
  return (
    <div className="page-container">
      <div className={s.wrapper}>
        <ClientsFilter filters={filters} onChange={setSearchParams} setClients={setClients} />
        {loading ? <Loader /> : <ClientsTable setClients={setClients} clients={filteredClients} />}
      </div>
    </div>
  )
}
