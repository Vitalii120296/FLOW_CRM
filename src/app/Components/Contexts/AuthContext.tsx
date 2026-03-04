import React, { createContext, useCallback, useEffect, useMemo, useState, useContext } from 'react'
import { authService } from '../../../services/authService'
import { userService } from '../../../services/userServices'
import type { SystemUser } from '../../../types'

interface AuthContextType {
  isChecked: boolean
  currentUser: SystemUser | null
  setCurrentUser: React.Dispatch<React.SetStateAction<SystemUser | null>>

  checkAuth: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string, password: string, confirmPassword: string) => Promise<SystemUser>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<SystemUser | null>(null)
  const [isChecked, setChecked] = useState(false)

  const checkAuth = useCallback(async () => {
    try {
      const user = localStorage.getItem('user')
      if (user) setCurrentUser(JSON.parse(user))
    } catch {
      console.log('User is not authenticated')
      setCurrentUser(null)
    } finally {
      setChecked(true)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    await authService.login(email, password)

    const user = await userService.getCurrentUser()

    localStorage.setItem('user', JSON.stringify(user))
    setCurrentUser(user)
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()

    localStorage.removeItem('user')
    setCurrentUser(null)
  }, [])

  const resetPassword = useCallback(
    async (email: string, password: string, confirmPassword: string) => {
      return authService.resetPassword(email, password, confirmPassword)
    },
    []
  )

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const value = useMemo(
    () => ({
      isChecked,
      currentUser,
      setCurrentUser,
      checkAuth,
      login,
      logout,
      resetPassword,
    }),
    [isChecked, currentUser, checkAuth, login, logout, resetPassword]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/* eslint-disable react-refresh/only-export-components */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
