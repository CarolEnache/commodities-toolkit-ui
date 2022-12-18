import styles from './DescriptionCard.module.scss'

type DescriptionCardProps = {
  preHeader: string;
  header: string;
  description: string;
}

const DescriptionCard = ({ preHeader, header, description}: DescriptionCardProps) => {
  return (
    <div className={styles.descriptionBox}>
    <h4 className={styles.boxPreHeader}>{preHeader}</h4>
    <h3>{header}</h3>
    <p>{description}</p>
  </div>
  )
}

export default DescriptionCard;