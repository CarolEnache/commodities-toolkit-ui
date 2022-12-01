import Link from 'next/link'
import styles from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
        <Link href="/">
          Home
        </Link>
        <Link href="/contact">
          Contact
        </Link>
        <Link href="/about">
          About
        </Link>
    </nav>
  );
};