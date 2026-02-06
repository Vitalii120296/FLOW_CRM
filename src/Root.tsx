import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { App } from './app/App.tsx'
import { Kanban } from './pages/KanbanPage/Kanban.tsx'
import { ClientsPage } from './pages/ClientsPage/ClientsPage.tsx'
import { UserManagmentPage } from './pages/UserManagmentPage/UserManagmentPage.tsx'
import { ProductsPage } from './pages/ProductsPage/ProductsPage.tsx'
import { CreateProductPage } from './pages/CreateProduct/CreateProduct.tsx'
import { PropertiesPage } from './pages/PropertiesPage/PropertiesPage.tsx'

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Kanban />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="profile" />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/create" element={<CreateProductPage />} />

          <Route path="user-management" element={<UserManagmentPage />} />
          <Route path="properties" element={<PropertiesPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
