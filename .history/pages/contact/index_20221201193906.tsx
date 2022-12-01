import Hamburger from 'hamburger-react'


const ContactPage = () => {
  return (
    <div>
            <div className={styles.hamburger}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      <h1>Contact</h1>
      <p>Send us a message!</p>
    </div>
  );
};

export default ContactPage;
