import { Outlet } from 'react-router-dom'
import './styles/main.scss'
import { Header } from '../widgets/Header/Header'
import { Navbar } from '../widgets/Navbar/Navbar'
import { Footer } from '../widgets/Footer/Footer'
import { useState } from 'react'

import { useEffect } from 'react'
import { useAuth } from './Components/Contexts/AuthContext'

export const App = () => {
  const [showBurger, setShowBurger] = useState(false)
  const { checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  return (
    <>
      <div className="app">
        <Header setShowBurger={setShowBurger} />

        <main className="container">
          <Navbar showBurger={showBurger} />
          <Outlet />
        </main>

        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </>
  )
}
