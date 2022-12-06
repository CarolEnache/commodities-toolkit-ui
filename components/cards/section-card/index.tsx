import type { ReactNode } from 'react'
import cn from "classnames";

import styles from './SectionCard.module.scss'

type descriptionItem = {
  paragraph: string;
}

type SectionCardProps = {
  preHeader: string;
  header: string;
  description?: descriptionItem[]
  children?: ReactNode;
  variant?: boolean;
  center?: boolean;
}

const SectionCard = ({ preHeader, header, description, children, variant, center }: SectionCardProps) => {
  return (
    <section className={cn(styles.sectionDescription, {[styles['sectionDescription--variant']]: variant}, {[styles['sectionDescription--center']]: center})}>
      <h4 className={styles.preHeader}>{preHeader} </h4>
      <h1 className={styles.header}>
        {header}
      </h1>
      {description?.map((item, index) => {
        return (
          <p key={index} className={styles.sectionDescription}>{item.paragraph}</p>
        )
      })
      }
      {children}
    </section>
  )
}

export default SectionCard;