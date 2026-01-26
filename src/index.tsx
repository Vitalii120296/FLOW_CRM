import { createRoot } from 'react-dom/client'
import '../src/app/styles/main.scss'
import { Root } from './Root'

createRoot(document.getElementById('root') as HTMLElement).render(<Root />)
