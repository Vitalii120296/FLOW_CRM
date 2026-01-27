import { useState } from 'react'
import { ProgressCard } from '../../app/Components/ProgressCard/ProgressCard'
import type { Client, ClientStatus } from '../../types'
import s from './Kanban.module.scss'
import { ClientDetails } from '../../widgets/ClientDetails/ClientDetails'

export const Kanban = () => {
  const clientStatus: ClientStatus[] = ['new', 'in_progress', 'done']
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  return (
    <section className="page-container">
      <h1 className="h2">Kanban Board</h1>
      <div className={s.kanban}>
        {selectedClient && (
          <ClientDetails client={selectedClient} quit={() => setSelectedClient(null)} />
        )}
        <ProgressCard clientStatus={clientStatus[0]} setSelectedClient={setSelectedClient} />
        <ProgressCard clientStatus={clientStatus[1]} setSelectedClient={setSelectedClient} />
        <ProgressCard clientStatus={clientStatus[2]} setSelectedClient={setSelectedClient} />
      </div>
    </section>
  )
}
