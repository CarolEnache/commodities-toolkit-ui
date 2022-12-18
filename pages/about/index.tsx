import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import Hamburger from 'hamburger-react'

import { Navigation } from '../../components/nav/Navigation';
import SectionCard from '../../components/cards/section-card'
import Footer from '../../components/footer';

import * as globalStyles from '../../styles/Home.module.scss'
import styles from './About.module.scss'

const About = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    // @ts-ignore
    <div className={globalStyles.container}>
      {/* @ts-ignore */}
      <main className={globalStyles.main}>
        <div>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
        {isOpen && <Navigation />}
        <SectionCard
          preHeader='About us'
          header='Meet the team'
          description={[
            { 
              paragraph: 'We will change this description but for the time being we can say that - Together with a small team of experts within socio-economic analysis, Wiebe Commodity Consulting will develop and manage your project from start to finish.' 
            }, 
            { 
              paragraph: 'We will change this description but for the time being we can say that - Together with a small team of experts within socio-economic analysis, Wiebe Commodity Consulting will develop and manage your project from start to finish.' 
            }, 
            { 
              paragraph: 'We will change this description but for the time being we can say that - Together with a small team of experts within socio-economic analysis, Wiebe Commodity Consulting will develop and manage your project from start to finish.' 
            }
          ]}

        >
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Link href="https://www.linkedin.com/in/c%C3%A9sar-costas-carrera-5a725a35/r">
                <Image
                  // loader={myLoader}
                  src="/cesar.jpeg"
                  alt="Picture of the author"
                  width={100}
                  height={100}
                />

              </Link>
            </div>

            <div className={styles.imageWrapper}>
              <Link href='https://www.linkedin.com/in/johann-wiebe-3980432/'>
                <Image
                  // loader={myLoader}
                  src="/johann.jpeg"
                  alt="Picture of the author"
                  width={100}
                  height={100}
                />
              </Link>

            </div>
            <div className={styles.imageWrapper}>
              <Image
                // loader={myLoader}
                src="/carol.jpeg"
                alt="Picture of the author"
                width={100}
                height={100}
              />
            </div>
          </div>
        </SectionCard>
        <SectionCard
          preHeader='A BRIEF HISTORY'
          header='Outline your company story'
          description={[{paragraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}]}
          variant
        />
        <SectionCard
          preHeader='Our Vision'
          header='Shaping the future together'
          // description={[{paragraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}]}
          center
        >
          <p>Do you want to know more about us? <br/>We&#39;d also love to hear your story and how we can work together.</p>
          
        </SectionCard>

      </main>
      <Footer />
    </div>
  );
};

export default About;
