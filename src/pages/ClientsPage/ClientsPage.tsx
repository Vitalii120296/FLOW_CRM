import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Client, ClientFilters, ClientStatus } from '../../types'

import { ClientsFilter } from '../../widgets/ClientsFilter/ClientsFilter'
import { ClientsTable } from '../../widgets/ClientsTable/ClientsTable'
import { getClientsTestApi } from '../../shared/api/clients.test-api'
import { Loader } from '../../app/Components/Loader/Loader'

import s from './ClientsPage.module.scss'

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
    setTimeout(() => {
      getClientsTestApi()
        .then(setClients)
        .finally(() => setLoading(false))
    }, 800)
  }, [])

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch = client.name.toLowerCase().includes(filters.search?.toLowerCase() ?? '')

      const matchesStatus = filters.status === 'all' || client.status === filters.status

      return matchesSearch && matchesStatus
    })
  }, [clients, filters.search, filters.status])

  // NOTE використовуємо page-container клас для сторінки (у міксинах є стилі для нього)
  return (
    <div className="page-container">
      <div className={s.wrapper}>
        <ClientsFilter filters={filters} onChange={setSearchParams} />
        {loading ? <Loader /> : <ClientsTable setClients={setClients} clients={filteredClients} />}
      </div>
    </div>
  )
}
