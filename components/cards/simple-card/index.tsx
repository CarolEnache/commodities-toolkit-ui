import type { ReactNode } from 'react'
import styles from './SimpleCard.module.scss'

type SimpleCardProps = {
  header: string;
  description: string;
  svg: string;
  variant?: boolean
}

// const svg = '/automated.svg'

const SimpleCard = ({ header, description, svg }: SimpleCardProps) => {

return (
    <div className={styles.simpleCard}>
      <div className={styles.iconContainer}>
        <div className={styles.iconWrapper}>
          {/* {children} */}
          <div         
          style={{ 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${svg})`,
            height: '15rem',
            width: '15rem'
          }}>

          </div>
        </div>
      </div>
      <h5 className={styles.subCategoryTitle}>{header}</h5>
      <p>{description}</p>
    </div>
  )
}

export default SimpleCard;