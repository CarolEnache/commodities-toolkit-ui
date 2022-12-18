import Link from 'next/link'
import { Facebook, Twitter, LinkedIn } from '../svgs';
import styles from './Footer.module.scss';

 const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerWrapper}>
      <Link href="/contact" className={styles.contactUsCta}>
        Contact us
      </Link>
      <div className={styles.footerIcons}>
        <LinkedIn />
        <Twitter />
        <Facebook />
      </div>
    </div>
  </footer>
)

export default Footer;