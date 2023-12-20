import Link from 'next/link'
import styles from './Navigation.module.scss';

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
        <Link href="/" className={styles.navItem}>
          Home
        </Link>
        <Link href="/report-configuration" className={styles.navItem}>
            Try Our Solution
        </Link>
        <Link href="/about" className={styles.navItem}>
          About
        </Link>
        <Link href="/contact" className={styles.contactUsCta }>
          Contact
        </Link>
    </nav>
  );
};