import Link from 'next/link'
import styles from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
        <Link href="/">
          About
        </Link>
        <Link href="/contact">
          Contact
        </Link>
        <Link href="/">
          Login
        </Link>

    </nav>
  );
};