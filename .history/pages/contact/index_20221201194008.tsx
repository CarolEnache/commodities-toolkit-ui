import { useState } from 'react'
import Hamburger from 'hamburger-react'


const ContactPage = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div>
      <div>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      <h1>Contact</h1>
      <p>Send us a message!</p>
    </div>
  );
};

export default ContactPage;
