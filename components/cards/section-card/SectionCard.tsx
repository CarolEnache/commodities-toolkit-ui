import type { ReactNode } from 'react'
import styles from './SectionCard.module.css'

type SectionCardProps = {
  preHeader: string;
  header: string;
  description: string;
  children: ReactNode;
  variant?: boolean
}

export const SectionCard = ({ preHeader, header, description, children, variant }: SectionCardProps) => {
  const variantClass = variant ? styles.sectionDescriptionVariant : styles.section
  return (
    <section className={variantClass}>
      <h4 className={styles.preHeader}>{preHeader} </h4>
      <h1 className={styles.header}>
        {header}
      </h1>
      <p className={styles.sectionDescription}>{description}</p>
      {children}
    </section>
  )
}
