import Link from 'next/link'
import styles from './Navigation.module.scss';
import { useBreakpoints } from "../../hooks/breakpoints";
import Hamburger from 'hamburger-react'
import { Navigation } from './Navigation';



export const Menu = ({isOpen, setOpen}: any) => {
  const isDesktop = useBreakpoints()

  return (
    <div className={styles.main}>
      <div className={styles.hamburger}>
        <Hamburger color='#012d49' toggled={isOpen} toggle={setOpen} direction='right' />
        {isOpen && <Navigation />}
      </div>
      {isDesktop && <Navigation />}
      <div className={styles.contactUsCta}>
        <Link href="/contact" >
          Contact us
        </Link>
      </div>
    </div>
  )
}
