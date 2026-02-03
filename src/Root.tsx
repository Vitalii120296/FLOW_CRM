import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { App } from './app/App.tsx'
import { DashBoard } from './pages/DashBoardPage/DashBoard.tsx'
import { Kanban } from './pages/KanbanPage/Kanban.tsx'
import { ClientsPage } from './pages/ClientsPage/ClientsPage.tsx'
import { UserManagmentPage } from './pages/UserManagmentPage/UserManagmentPage.tsx'

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Kanban />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="profile" />
          <Route path="user-management" element={<UserManagmentPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
