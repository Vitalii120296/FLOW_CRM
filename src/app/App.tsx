import { Outlet } from 'react-router-dom'
import './styles/main.scss'
import { Header } from '../widgets/Header/Header'
import { Navbar } from '../widgets/Navbar/Navbar'
import { Footer } from '../widgets/Footer/Footer'

export const App = () => {
  return (
    <>
      <div className="app">
        <Header />

        <main>
          <Navbar />
          <Outlet />
        </main>

        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </>
  )
}
