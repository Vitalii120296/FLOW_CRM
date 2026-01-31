import s from './CloseButton.module.scss'
import { BsX } from 'react-icons/bs'

type Props = {
  onClick: () => void
  ariaLabel?: string
}

export const CloseButton: React.FC<Props> = ({ onClick, ariaLabel }) => {
  return (
    <button className={s.close_button} type="button" aria-label={ariaLabel} onClick={onClick}>
      <BsX aria-hidden="true" className={s.icon} />
    </button>
  )
}
