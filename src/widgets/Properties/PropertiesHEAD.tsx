import styles from './PropertiesHEAD.module.scss'
import cn from 'classnames'

import type { PropertiesLogo } from '../../types/properties'
import { useRef, useState } from 'react'

export const PropertiesHEAD = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const titleInputRef = useRef<HTMLInputElement | null>(null)

  const [logo, setLogo] = useState<PropertiesLogo>({
    url: null,
  })

  const [businessName, setBusinessName] = useState('')
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    setLogo({ url: previewUrl })
  }

  const handleRemoveLogo = () => {
    setLogo({ url: null })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    //тут пізніше буде API remove
  }

  const startEditTitle = () => {
    setIsEditingTitle(true)
    setTimeout(() => titleInputRef.current?.focus(), 0)
  }

  const finishEditTitle = () => {
    setIsEditingTitle(false)
  }
  return (
    <div className="container">
      <div className={styles.wrapperHead}>
        {/* ===== BUSINESS NAME ===== */}
        <div className={styles.titleWrapper}>
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              onBlur={finishEditTitle}
              onKeyDown={(e) => e.key === 'Enter' && finishEditTitle()}
              placeholder="Add business name"
              className={styles.titleInput}
            />
          ) : (
            <h1 className={cn('h2', styles.title)} onClick={startEditTitle}>
              {businessName || 'Add business name'}
              <span className={styles.editHint}>Edit</span>
            </h1>
          )}
        </div>

        {/* ===== LOGO ===== */}
        <div className={styles.logoBlock}>
          {!logo.url && <p className={cn('h4', styles.label)}>Company logo</p>}

          {logo.url ? (
            <div className={styles.logoPreview}>
              <div className={styles.imageWrapper}>
                <img src={logo.url} alt="Company logo" />

                <div className={styles.overlay}>
                  <button className={styles.change} type="button" onClick={handleUploadClick}>
                    Change
                  </button>
                  <button className={styles.remove} type="button" onClick={handleRemoveLogo}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button className={styles.upload} type="button" onClick={handleUploadClick}>
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
    </div>
  )
}
