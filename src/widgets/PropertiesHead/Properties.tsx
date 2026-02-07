import React, { useRef, useState } from 'react'
import stylesHead from './PropertiesHead.module.scss'
import stylesBody from './PropertiesBody.module.scss'
import cn from 'classnames'
import type { PropertiesInfo } from '../../types/properties'

export const Properties = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const titleInputRef = useRef<HTMLInputElement | null>(null)

  // единый стейт для всей информации о бизнесе
  const [businessInfo, setBusinessInfo] = useState<PropertiesInfo>({
    name: '',
    description: '',
    type: '',
    email: '',
    phone: '',
    logo: { url: null },
  })

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ===== Логотип =====
  const handleUploadClick = () => fileInputRef.current?.click()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const previewUrl = URL.createObjectURL(file)
    setBusinessInfo((prev) => ({ ...prev, logo: { url: previewUrl } }))
  }

  const handleRemoveLogo = () => {
    setBusinessInfo((prev) => ({ ...prev, logo: { url: null } }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // ===== Название =====
  const startEditTitle = () => {
    setIsEditingTitle(true)
    setTimeout(() => titleInputRef.current?.focus(), 0)
  }

  const finishEditTitle = () => setIsEditingTitle(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessInfo((prev) => ({ ...prev, name: e.target.value }))
  }

  // ===== Другие поля формы =====
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBusinessInfo((prev) => ({ ...prev, [name]: value }))
  }

  // ===== Сохранение =====
  const handleSave = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(businessInfo),
      })

      console.log(businessInfo)

      if (!response.ok) throw new Error('Error saving data')

      const result = await response.json()
      console.log('Saved successfully:', result)
      alert('Data saved successfully!')
    } catch (err) {
      console.error(err)
      alert('An error occurred while saving data')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container">
      {/* ===== HEADER: LOGO + TITLE ===== */}
      <div className={stylesHead.wrapperHead}>
        <div className={stylesHead.titleWrapper}>
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              value={businessInfo.name}
              onChange={handleTitleChange}
              onBlur={finishEditTitle}
              onKeyDown={(e) => e.key === 'Enter' && finishEditTitle()}
              placeholder="Add business name"
              className={stylesHead.titleInput}
            />
          ) : (
            <h1 className={cn('h2', stylesHead.title)} onClick={startEditTitle}>
              {businessInfo.name || 'Add business name'}
              <span className={stylesHead.editHint}>Edit</span>
            </h1>
          )}
        </div>

        <div className={stylesHead.logoBlock}>
          {!businessInfo.logo.url && <p className={cn('h4', stylesHead.label)}>Company logo</p>}

          {businessInfo.logo.url ? (
            <div className={stylesHead.logoPreview}>
              <div className={stylesHead.imageWrapper}>
                <img src={businessInfo.logo.url} alt="Company logo" />
                <div className={stylesHead.overlay}>
                  <button className={stylesHead.change} type="button" onClick={handleUploadClick}>
                    Change
                  </button>
                  <button className={stylesHead.remove} type="button" onClick={handleRemoveLogo}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button className={stylesHead.upload} type="button" onClick={handleUploadClick}>
              Upload logo
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            hidden
            onChange={handleFileChange}
          />
        </div>
      </div>

      <hr />

      {/* ===== BODY: форма ===== */}
      <div className={stylesBody.wrapper}>
        <div className={stylesBody.form}>
          <div className={stylesBody.field}>
            <label className={cn('h3', stylesBody.labelText)} htmlFor="description">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={businessInfo.description}
              onChange={handleChange}
              placeholder="Brief description"
              className={stylesBody.titleInput}
            />
          </div>

          <div className={stylesBody.field}>
            <label className={cn('h3', stylesBody.labelText)} htmlFor="type">
              Business Type
            </label>
            <input
              id="type"
              name="type"
              type="text"
              value={businessInfo.type}
              onChange={handleChange}
              placeholder="salon, agency, service"
              className={stylesBody.titleInput}
            />
          </div>

          <div className={stylesBody.field}>
            <label className={cn('h3', stylesBody.labelText)} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={businessInfo.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className={stylesBody.titleInput}
            />
          </div>

          <div className={stylesBody.field}>
            <label className={cn('h3', stylesBody.labelText)} htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={businessInfo.phone}
              onChange={handleChange}
              placeholder="+380000000000"
              className={stylesBody.titleInput}
            />
          </div>

          <button
            type="button"
            className={stylesBody.saveButton}
            onClick={handleSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
