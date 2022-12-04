import { useState } from 'react'
import Hamburger from 'hamburger-react'

import { Navigation } from '../../components/nav/Navigation';


const About = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div>
      <div>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      {isOpen && <Navigation />}
      <h1>About us</h1>
      <p>This page is about us</p>
    </div>
  );
};

export default About;
