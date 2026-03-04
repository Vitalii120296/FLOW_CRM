import { useEffect, useState, type FormEvent } from 'react'
import type { SystemUser } from '../../types'
import s from './ProfilePage.module.scss'
import { Loader } from '../../app/Components/Loader/Loader'
import cn from 'classnames'
import { motion } from 'motion/react'
import { useAuth } from '../../app/Components/Contexts/AuthContext'
import { userService } from '../../services/userServices'

export const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<SystemUser | null>(null)
  const [isEditingData, setIsEditingData] = useState<keyof SystemUser | null>(null)
  const [loading, setLoading] = useState(false)
  const { currentUser, setCurrentUser } = useAuth()

  useEffect(() => {
    setUserProfile(currentUser)
  }, [])

  const handleChange = <K extends keyof SystemUser>(key: K, value: SystemUser[K]) => {
    setUserProfile((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!userProfile) return
    setLoading(true)
    try {
      const data = {
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        email: userProfile.email,
      }
      const updatedUser = await userService.updateUserData(data)

      setCurrentUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    } catch (err) {
      console.error(err)
      // показати тост повідомлення про помилку
    } finally {
      setLoading(false)
      setIsEditingData(null)
    }
  }

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const oldPassword = (form.elements.namedItem('old_password') as HTMLInputElement).value
    const newPassword = (form.elements.namedItem('new_password') as HTMLInputElement).value
    const confirmPassword = (form.elements.namedItem('confirm_password') as HTMLInputElement).value

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      })
      if (!response.ok) throw new Error('Failed to change password')
      alert('Password changed successfully')
      form.reset()
    } catch (err) {
      console.error(err)
      alert('Error changing password')
    } finally {
      setLoading(false)
    }
  }

  if (!userProfile) return <Loader />

  return (
    <section className={cn('page-container', s.section_profile)}>
      <h1 className="h2">Profile page</h1>

      {/* Personal info form */}
      <motion.form
        onSubmit={handleProfileSubmit}
        initial={{ opacity: 0, translateY: 25 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1, ease: 'linear' }}
        className={s.personal_info__wrapper}
      >
        <div className={s.profile_photo}>
          <h2 className="h3">Profile photo</h2>
          <div className={s.photo}>
            <div className={s.user_photo}>
              <img src={userProfile.avatar || ''} alt="user photo" />
            </div>
            <div className={s.photo_buttons}>
              <button type="button" className={s.add_photo}>
                Choose photo
              </button>
              <button type="button" className={s.remove_photo}>
                Remove photo
              </button>
            </div>
          </div>
        </div>

        <div className={s.personal_info}>
          <h2 className="h3">Personal info</h2>

          <div className={s.user_name}>
            <label htmlFor="first_name" onClick={() => setIsEditingData('first_name')}>
              <span className={s.title}>First name: </span>
              {isEditingData !== 'first_name' ? (
                <span>{userProfile.first_name}</span>
              ) : (
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={userProfile.first_name}
                  onBlur={() => setIsEditingData(null)}
                  onChange={(e) => handleChange('first_name', e.target.value)}
                />
              )}
            </label>
          </div>

          <div className={s.user_name}>
            <label htmlFor="last_name" onClick={() => setIsEditingData('last_name')}>
              <span className={s.title}>Last name: </span>
              {isEditingData !== 'last_name' ? (
                <span>{userProfile.last_name}</span>
              ) : (
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={userProfile.last_name}
                  onBlur={() => setIsEditingData(null)}
                  onChange={(e) => handleChange('last_name', e.target.value)}
                />
              )}
            </label>
          </div>

          <div className={s.user_email}>
            <label htmlFor="user_email" onClick={() => setIsEditingData('email')}>
              <span className={s.title}>User email: </span>
              {isEditingData !== 'email' ? (
                <span>{userProfile.email}</span>
              ) : (
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  value={userProfile.email}
                  onBlur={() => setIsEditingData(null)}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              )}
            </label>
          </div>

          <div className={s.user_role}>
            <label>
              <span className={s.title}>User role:</span>
              <span>{userProfile.role}</span>
            </label>
          </div>

          <div className={s.profile_page_actions}>
            <button type="submit" className={s.save} disabled={loading}>
              {loading ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>
      </motion.form>

      {/* Password form */}
      <motion.form
        onSubmit={handlePasswordSubmit}
        initial={{ opacity: 0, translateY: 25 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: 'linear' }}
        className={s.personal_info__wrapper}
      >
        <div className={s.security}>
          <h2 className="h3">Change password</h2>
          <div className={s.change_password}>
            <label htmlFor="old_password">
              <span>Old password</span>
              <input
                type="password"
                name="old_password"
                id="old_password"
                placeholder="***********"
              />
            </label>
            <label htmlFor="new_password">
              <span>New password</span>
              <input
                type="password"
                name="new_password"
                id="new_password"
                placeholder="***********"
              />
            </label>
            <label htmlFor="confirm_password">
              <span>Confirm new password</span>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="***********"
              />
            </label>
          </div>
          <div className={s.profile_page_actions}>
            <button type="submit" className={s.save} disabled={loading}>
              {loading ? 'Saving...' : 'Change password'}
            </button>
          </div>
        </div>
      </motion.form>
    </section>
  )
}
