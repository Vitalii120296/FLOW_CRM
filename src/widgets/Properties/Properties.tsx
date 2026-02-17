import React, { useRef, useState } from 'react'
import stylesHead from './PropertiesHead.module.scss'
import stylesBody from './PropertiesBody.module.scss'
import cn from 'classnames'
import type { PropertiesInfo } from '../../types/properties'
import type { ValidationError } from '../../types/ValidationErrorType'
import { getValidationErrorMessage } from '../../types/validationMessages'
import { validateService } from '../../services/validateServices'
import { BiSolidError } from 'react-icons/bi'

type FormErrors = {
  name?: ValidationError
  type?: ValidationError
  email?: ValidationError
  phone?: ValidationError
  comment?: ValidationError
}

export const Properties = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const titleInputRef = useRef<HTMLInputElement | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})

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
    setErrors((prev) => ({ ...prev, name: undefined }))
  }

  // ===== Другие поля формы =====
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBusinessInfo((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  // ===== Сохранение =====
  const handleSave = async () => {
    const newErrors: FormErrors = {}

    const nameError = validateService.validateName(businessInfo.name)
    if (nameError) newErrors.name = nameError

    const typeError = validateService.validateName(businessInfo.type)
    if (typeError) newErrors.type = typeError

    const emailError = validateService.validateEmail(businessInfo.email)
    if (emailError) newErrors.email = emailError

    const phoneError = validateService.validatePhone(businessInfo.phone)
    if (phoneError) newErrors.phone = phoneError

    const commentError = validateService.validateComment(businessInfo.description)
    if (commentError) newErrors.comment = commentError

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    console.log('Business Info to save:', businessInfo)

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(businessInfo),
      })

      if (!response.ok) throw new Error('Error saving data')

      alert('Data saved successfully!')
    } catch {
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

          {errors.name && (
            <div className={cn('errorContainer', stylesHead.errorHead)}>
              <BiSolidError className="errorIcon" />
              <p className="errorText">{getValidationErrorMessage(errors.name)}</p>
            </div>
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

          {errors.comment && (
            <div className="errorContainer">
              <BiSolidError className="errorIcon" />
              <p className="errorText">{getValidationErrorMessage(errors.comment)}</p>
            </div>
          )}

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

          {errors.type && (
            <div className="errorContainer">
              <BiSolidError className="errorIcon" />
              <p className="errorText">{getValidationErrorMessage(errors.type)}</p>
            </div>
          )}

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

          {errors.email && (
            <div className="errorContainer">
              <BiSolidError className="errorIcon" />
              <p className="errorText">{getValidationErrorMessage(errors.email)}</p>
            </div>
          )}

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

          {errors.phone && (
            <div className="errorContainer">
              <BiSolidError className="errorIcon" />
              <p className="errorText">{getValidationErrorMessage(errors.phone)}</p>
            </div>
          )}

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
