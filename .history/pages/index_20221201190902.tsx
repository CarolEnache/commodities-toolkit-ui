import { useState } from 'react'
import type { ReactDOM } from 'react'

import Link from 'next/link'
import Head from "next/head";
import Image from "next/image";

import type { NextPage } from "next";

import Hamburger from 'hamburger-react'

import { MathematicalSymbol, IntegralSymbol, Estimate, Analysis, Community } from "../components/icons";

import styles from "../styles/Home.module.css";

const Navigation = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className={styles.navigation}>
      <div className={styles.logo}>
        <Image src="/logo.png" width={50} height={50} alt={''} />
      </div>
      <div className={styles.links}>
        <Link href="/">
          About
        </Link>
        <Link href="/">
          Contact
        </Link>
        <Link href="/">
          Login
        </Link>
      </div>
    </nav>
  );
};

const Home: NextPage = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>SEA-CT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/fav.png" />
      </Head>
      <div className={styles.hamburger}>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      <Navigation />
      <div
        style={{
          width: "100%",
          height: "25rem",
          backgroundImage: "url(/hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // transform: `scale(1.5)`,
          gridColumn: "1 / -1",
        }}
      >
      </div>

      <Link href="/contact" className={styles.contactUsCta}>
        Contact us
      </Link>


      <main className={styles.main}>
        <section className={styles.section}>
          <h4 className={styles.preHeader}>SOCIO ECONOMIC ANALYSIS </h4>
          <h1 className={styles.header}>
          We are experts at socio-economic analysis based on input-output modelling. 
          </h1>
          <p className={styles.sectionDescription}>Input-output analysis is a type of economic model that describes the interdependent relationships between industrial sectors within an economy. It shows how the outputs of one sector flow into another sector as inputs. Wassily Leontief, who was a Soviet-American economist, developed the input-output analysis method, earning him the Nobel Prize in Economics in 1973.</p>
          <MathematicalSymbol/>
        </section>
        <section className={styles.sectionDescriptionVariant}>
          <h4 className={styles.preHeader}>community development</h4>
          <h1 className={styles.header}>
          We simplify complex questions. 
          </h1>
          <p className={styles.sectionDescription}>Socio economic analysis is an umbrella term for theories that marry economic factors with impacts on human sociology. At its core, socio-economic analysis uses economic inputs to drive social change. It is a type of analysis that is commonly used to structure community development programs.</p>
          <Community/>
        </section>
        <section className={styles.section}>
          <h4 className={styles.preHeader}>IMPACTS</h4>
          <h1 className={styles.header}>Kinds of impacts in the input-output analysis.</h1>
          <p className={styles.sectionDescription}>By quantifying the supply chain in different industries in an economy, input-output analysis can be used to analyze the economic impacts of an initial change in final demand. Impacts may be categorized as follows:</p>
          
          <div className={styles.descriptionBox}>
            <h4 className={styles.boxPreHeader}>INITIAL EFFECT</h4>
            <h3>DIRECT EFFECT</h3>
            <p>Goods, consumables and services purchased directly by the mining operation or project</p>
          </div>
          <div className={styles.descriptionBox}>
            <h4 className={styles.boxPreHeader}>FIRST ROUND <span>&</span> INDUSTRIAL SUPPORT</h4>
            <h3>INDIRECT EFFECT</h3>
            <p>Suppliers of steel, cement, etc. will themselves trigger further demand for energy, chemicals transport, etc</p>
          </div>
          <div className={styles.descriptionBox}>
            <h4 className={styles.boxPreHeader}>INCOME EFFECT</h4>
            <h3>INDUCED EFFECT</h3>
            <p>Employment opportunities created by the operation mean increase earnings that are largely spent locally</p>
          </div>
        </section>
        <section className={styles.sectionDescriptionVariant}>
          <h4 className={styles.preHeader}>KEY ATTRIBUTES</h4>
          <h1 className={styles.header}>Most important characteristics of the Input-output model.</h1>
          <p className={styles.sectionDescription}>By quantifying the supply chain in different industries in an economy, input-output analysis can be used to analyze the economic impacts of an initial change in final demand. Impacts may be categorized as follows:</p>
          <div className={styles.iconContainer}>
            <div className={styles.iconWrapper}>
            <IntegralSymbol />
            </div>
          </div>


          <h5 className={styles.subCategoryTitle}>Integral</h5>
          <p>Input-output analysis describes the interdependent supply chains between sectors within an economy.</p>
          <div className={styles.iconContainer}>
            <div className={styles.iconWrapper}>
              <Estimate />
            </div>
          </div>


          <h5 className={styles.subCategoryTitle}>Estimate</h5>
          <p>The input-output analysis toolkit quantifies the output streams from one industry as inputs to another.</p>

          <div className={styles.iconContainer}>
            <div className={styles.iconWrapper}>
              <Analysis />
            </div>
          </div>


          <h5 className={styles.subCategoryTitle}>Estimate</h5>
          <p>In the input-output analysis model, the global economic impact of an economic event can be analysed on the basis of the initial evolution of demand and its direct, indirect and induced impacts.</p>

        </section>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
