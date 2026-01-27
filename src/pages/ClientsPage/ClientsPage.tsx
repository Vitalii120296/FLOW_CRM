import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Client, ClientFilters, ClientStatus } from '../../types'

import { ClientsFilter } from '../../widgets/ClientsFilter/ClientsFilter'
import { ClientsTable } from '../../widgets/ClientsTable/ClientsTable'
import { getClientsTestApi } from '../../shared/api/clients.test-api'

export const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: ClientFilters = {
    search: searchParams.get('search') ?? '',
    status: (searchParams.get('status') as ClientStatus) ?? 'all',
  }

  // 2️⃣ загружаем клиентов (тестовый API)
  useEffect(() => {
    getClientsTestApi().then(setClients)
  }, [])

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch = client.name.toLowerCase().includes(filters.search?.toLowerCase() ?? '')

      const matchesStatus = filters.status === 'all' || client.status === filters.status

      return matchesSearch && matchesStatus
    })
  }, [clients, filters.search, filters.status])

  return (
    <div className="container">
      <ClientsFilter filters={filters} onChange={setSearchParams} />

      <ClientsTable clients={filteredClients} />
    </div>
  )
}
