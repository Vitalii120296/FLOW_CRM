import type React from 'react'
import type { ClientFilters, ClientStatus } from '../../types'

import styles from './ClientsFilter.module.scss'

type Props = {
  filters: ClientFilters
  onChange: (params: URLSearchParams) => void
}

export const ClientsFilter: React.FC<Props> = ({ filters, onChange }) => {
  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams()

    if (value) {
      params.set('search', value)
    }

    if (filters.status) {
      params.set('status', filters.status)
    }

    onChange(params)
  }

  const handleStatusChange = (status: ClientStatus | 'all') => {
    const params = new URLSearchParams()

    if (filters.search) {
      params.set('search', filters.search)
    }

    if (status !== 'all') {
      params.set('status', status)
    }

    onChange(params)
  }
  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Search client"
        value={filters.search ?? ''}
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      <select
        value={filters.status ?? 'all'}
        onChange={(e) => handleStatusChange(e.target.value as ClientStatus | 'all')}
      >
        <option value="all">All</option>
        <option value="new">New</option>
        <option value="in_progress">In progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  )
}
