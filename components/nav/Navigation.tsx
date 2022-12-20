import Link from 'next/link'
import styles from './Navigation.module.scss';

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
        <Link href="/" className={styles.navItem}>
          Home
        </Link>
        <Link href="/" className={styles.navItem}>
          Our Solution
        </Link>
        <Link href="/contact" className={styles.navItem}>
          Contact
        </Link>
        <Link href="/about" className={styles.navItem}>
          About
        </Link>
    </nav>
  );
};