import { createRoot } from 'react-dom/client'
import '../src/app/styles/main.scss'
import { Root } from './Root'
import { AuthProvider } from './app/Components/Contexts/AuthContext'

createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <Root />
  </AuthProvider>
)
