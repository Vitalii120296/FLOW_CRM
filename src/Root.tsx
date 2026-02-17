import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { App } from './app/App.tsx'
import { Kanban } from './pages/KanbanPage/Kanban.tsx'
import { ClientsPage } from './pages/ClientsPage/ClientsPage.tsx'
import { UserManagmentPage } from './pages/UserManagmentPage/UserManagmentPage.tsx'
import { ProductsPage } from './pages/ProductsPage/ProductsPage.tsx'
import { CreateProductPage } from './pages/CreateProductPage/CreateProductPage.tsx'
import { PropertiesPage } from './pages/PropertiesPage/PropertiesPage.tsx'
import { ProfilePage } from './pages/ProfilePage/ProfilePage.tsx'
import { RegisterPage } from './pages/RegisterPage/RegisterPage.tsx'
import { LoginPage } from './pages/LoginPage/LoginPage.tsx'
import { StartPage } from './pages/StartPage/StartPage.tsx'

export const Root = () => {
  return (
    <Router>
      <Routes>
        {/* Стартовая страница по корню */}
        <Route path="/" element={<StartPage />} />

        {/* Публичные страницы */}
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />

        {/* CRM внутри App */}
        <Route path="crm" element={<App />}>
          <Route index element={<Kanban />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/create" element={<CreateProductPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="user-management" element={<UserManagmentPage />} />
          <Route path="properties" element={<PropertiesPage />} />
        </Route>

        {/* Любой неизвестный путь редиректим на / */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
