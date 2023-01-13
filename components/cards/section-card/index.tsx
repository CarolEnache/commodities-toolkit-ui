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
  wideChildren?: boolean;
  svg?: ReactNode;
  desktopOnlySVG?: ReactNode;
}

const SectionCard = ({ preHeader, header, description, children, variant, center, svg, desktopOnlySVG }: SectionCardProps) => {
  return (
    <section className={cn(styles.sectionCard, { [styles['sectionCard--variant']]: variant }, { [styles['sectionCard--center']]: center })}>
      <h4 className={cn(styles.preHeader, { [styles['preHeader--variant']]: variant }, { [styles['preHeader--center']]: center })}>
        {preHeader}
      </h4>
      <h1 className={cn(styles.header, { [styles['header--variant']]: variant }, { [styles['header--center']]: center })}>
        {header}
      </h1>
      {description?.map((item, index) => {
        return (
          <p key={index} className={cn(styles.description, { [styles['description--variant']]: variant }, { [styles['description--center']]: center })}> {item.paragraph}</p>
        )
      })
      }
      {svg && ( 
        <div
          style={{ 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${svg})`
          }}
          className={cn(styles.svg, { [styles['svg--desktopOnlySVG']]: desktopOnlySVG }, { [styles['svg--variant']]: variant })}></div>
        )}
      <div className={styles.children}>
        {children}
      </div>
    </section>
  )
}

export default SectionCard;