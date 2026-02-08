import { useEffect, useState } from 'react'
import type { SystemUser } from '../../types'
import s from './ProfilePage.module.scss'
import { Loader } from '../../app/Components/Loader/Loader'
import { getUsersTestApi } from '../../shared/api/users.test-api'

export const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<SystemUser | null>(null)
  const [isEditingData, setIsEditingData] = useState<keyof SystemUser | null>(null)

  useEffect(() => {
    getUsersTestApi().then((res) => setUserProfile(res[0]))
  }, [])

  const handleChange = <K extends keyof SystemUser>(key: K, value: SystemUser[K]) => {
    setUserProfile((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        [key]: value,
      }
    })
  }

  if (!userProfile) return <Loader />

  return (
    <section className="page-container">
      <h1 className="h2">Profile page</h1>
      <div className={s.personal_info__wrapper}>
        <div className={s.personal_info}>
          <h2 className="h3">Personal info</h2>

          <div className={s.user_name}>
            <label htmlFor="user_name" onClick={() => setIsEditingData('name')}>
              <span>User name: </span>
              {isEditingData !== 'name' ? (
                <span>{userProfile.name}</span>
              ) : (
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  value={userProfile.name}
                  onBlur={() => setIsEditingData(null)}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              )}
            </label>
          </div>
          <div className={s.user_email}>
            <label htmlFor="user_email" onClick={() => setIsEditingData('email')}>
              <span>User email: </span>
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
              <span>User role:</span>
              <span>{userProfile.role}</span>
            </label>
          </div>
        </div>
        <div className={s.profile_photo}>
          <h2 className="h3">Profile photo</h2>

          <div className={s.photo}>
            <div className={s.user_photo}>
              <img
                src={
                  userProfile.photo
                    ? userProfile.photo
                    : 'public/productImages/defaultProductImage.WebP'
                }
                alt="user photo"
              />
            </div>
            <div className={s.photo_buttons}>
              <button className={s.add_photo}>Choose photo</button>
              <button className={s.remove_photo}>Remove photo</button>
            </div>
          </div>
        </div>
        <div className={s.security}>
          <h2 className="h3">Change password</h2>
          <div className={s.change_password}>
            <label htmlFor="old_password">
              <span>Old password</span>
              <input
                type="password"
                name="old password"
                id="old_password"
                placeholder="***********"
              />
            </label>
            <label htmlFor="new_password">
              <span>New password</span>
              <input
                type="password"
                name="new password"
                id="new_password"
                placeholder="***********"
              />
            </label>
            <label htmlFor="confirm_password">
              <span>Confirm new password</span>
              <input
                type="password"
                name="confirm new password"
                id="confirm_password"
                placeholder="***********"
              />
            </label>
          </div>
        </div>
      </div>
      <div className={s.profile_page_actions}>
        <button className={s.save}>Save changes</button>
        <button className={s.cancel}>Cancel</button>
      </div>
    </section>
  )
}
