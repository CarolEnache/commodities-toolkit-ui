import Link from 'next/link'
import styles from './Navigation.module.scss';
import { useBreakpoints } from "../../hooks/breakpoints";
import Hamburger from 'hamburger-react'
import { Navigation } from './Navigation';

export const Menu = ({toggleBurger, setOpen}: any) => {
  const isDesktop = useBreakpoints()

  return (
    <div className={styles.main}>
      <div className={styles.hamburger}>
        <Hamburger color='#012d49' toggled={toggleBurger} toggle={setOpen} direction='right' />
        {toggleBurger && <Navigation />}
      </div>
      {isDesktop && <Navigation />}
    </div>
  )
}
