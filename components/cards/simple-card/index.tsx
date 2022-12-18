import type { ReactNode } from 'react'
import styles from './SimpleCard.module.scss'

type SimpleCardProps = {
  header: string;
  description: string;
  children: ReactNode;
  variant?: boolean
}

const SimpleCard = ({ header, description, children }: SimpleCardProps) => {

return (
    <>
      <div className={styles.iconContainer}>
        <div className={styles.iconWrapper}>
          {children}
        </div>
      </div>
      <h5 className={styles.subCategoryTitle}>{header}</h5>
      <p>{description}</p>
    </>
  )
}

export default SimpleCard;