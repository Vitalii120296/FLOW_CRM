import { useEffect, useState } from 'react'
import { ProgressCard } from '../../app/Components/ProgressCard/ProgressCard'
import type { Client, ClientStatus } from '../../types'
import s from './Kanban.module.scss'
import { ClientDetails } from '../../widgets/ClientDetails/ClientDetails'
import { getClientsTestApi } from '../../shared/api/clients.test-api'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'

type ColumnData = {
  id: ClientStatus
  columnClients: string[]
}

type KanbanData = {
  clients: Record<string, Client>
  columns: Record<ClientStatus, ColumnData>
}

export const Kanban = () => {
  const [columnsData, setColumnsData] = useState<KanbanData | null>()
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  useEffect(() => {
    // 1. Fetch clients
    getClientsTestApi().then((allClients) => {
      // 2. Transform data
      const clientsMap: Record<string, Client> = {}
      const columnsMap: Record<ClientStatus, ColumnData> = {
        new: { id: 'new', columnClients: [] },
        in_progress: { id: 'in_progress', columnClients: [] },
        done: { id: 'done', columnClients: [] },
      }

      allClients.forEach((client) => {
        clientsMap[client.id] = client
        columnsMap[client.status].columnClients.push(client.id)
      })

      setColumnsData({ clients: clientsMap, columns: columnsMap })
    })
  }, [])

  console.log(columnsData)
  if (!columnsData) return <p>Loading...</p>

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const startColumn = columnsData.columns[source.droppableId as ClientStatus]
    const finishColumn = columnsData.columns[destination.droppableId as ClientStatus]

    // Перетягування всередині однієї колонки
    if (startColumn === finishColumn) {
      const newClientIds = Array.from(startColumn.columnClients)
      newClientIds.splice(source.index, 1)
      newClientIds.splice(destination.index, 0, draggableId)

      const newColumn = { ...startColumn, columnClients: newClientIds }

      setColumnsData({
        ...columnsData,
        columns: {
          ...columnsData.columns,
          [newColumn.id]: newColumn,
        },
      })
      return
    }

    // Перетягування між колонками
    const startClientIds = Array.from(startColumn.columnClients)
    startClientIds.splice(source.index, 1)

    const finishClientIds = Array.from(finishColumn.columnClients)
    finishClientIds.splice(destination.index, 0, draggableId)

    setColumnsData({
      ...columnsData,
      columns: {
        ...columnsData.columns,
        [startColumn.id]: { ...startColumn, columnClients: startClientIds },
        [finishColumn.id]: { ...finishColumn, columnClients: finishClientIds },
      },
    })
  }

  return (
    <section className="page-container">
      <h1 className="h2">Kanban Board</h1>
      <div className={s.kanban}>
        {selectedClient && (
          <ClientDetails client={selectedClient} quit={() => setSelectedClient(null)} />
        )}
        <DragDropContext onDragEnd={onDragEnd}>
          {(Object.keys(columnsData.columns) as ClientStatus[]).map((status) => {
            const columnClients = columnsData.columns[status].columnClients.map(
              (id) => columnsData.clients[id]
            )

            return (
              <ProgressCard
                key={status}
                clients={columnClients}
                columnId={status}
                setSelectedClient={setSelectedClient}
              />
            )
          })}
        </DragDropContext>
      </div>
    </section>
  )
}
