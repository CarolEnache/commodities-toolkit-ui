import { useState } from 'react'
import Hamburger from 'hamburger-react'

import Link from 'next/link'
import Image from 'next/image'
import type { NextPage } from "next";

import { MathematicalSymbol, IntegralSymbol, Estimate, Analysis, Community } from "../components/svgs";
import { Navigation } from "../components/nav/Navigation";
import { SectionCard, SimpleCard, DescriptionCard } from "../components/cards";
import Footer from "../components/footer";

import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.hamburger}>
          <Hamburger color='#012d49' toggled={isOpen} toggle={setOpen} />
      </div>
      {isOpen && <Navigation />}

      <div className={styles.hello}>
        <Image src='/hero.png' layout='fill' alt={''} />
      </div>

      <Link href="/contact" className={styles.contactUsCta}>
        Contact us
      </Link>

      <main className={styles.main}>
        <SectionCard
          preHeader='SOCIO ECONOMIC ANALYSIS'
          header='We are experts at socio-economic analysis based on input-output modelling.'
          description={[{ paragraph: 'Input-output analysis is a type of economic model that describes the interdependent relationships between industrial sectors within an economy. It shows how the outputs of one sector flow into another sector as inputs. Wassily Leontief, who was a Soviet-American economist, developed the input-output analysis method, earning him the Nobel Prize in Economics in 1973.' }]}
        >
          <MathematicalSymbol />
        </SectionCard>
        <SectionCard
          variant
          preHeader='community development'
          header='We simplify complex questions.'
          description={[{ paragraph: 'Socio economic analysis is an umbrella term for theories that marry economic factors with impacts on human sociology. At its core, socio-economic analysis uses economic inputs to drive social change. It is a type of analysis that is commonly used to structure community development programs.' }]}
        >
          <Community />
        </SectionCard>
        <SectionCard
          preHeader='IMPACTS'
          header='Kinds of impacts in the input-output analysis.'
          description={[{ paragraph: 'By quantifying the supply chain in different industries in an economy, input-output analysis can be used to analyze the economic impacts of an initial change in final demand. Impacts may be categorized as follows:' }]}
        >
          <DescriptionCard
            preHeader='INITIAL EFFECT'
            header='DIRECT EFFECT'
            description='Goods, consumables and services purchased directly by the mining operation or project'
          />
          <DescriptionCard
            preHeader={`FIRST ROUND ${<span>&</span>} INDUSTRIAL SUPPORT`}
            header='INDIRECT EFFECT'
            description='Suppliers of steel, cement, etc. will themselves trigger further demand for energy, chemicals transport, etc'
          />
          <DescriptionCard
            preHeader='INCOME EFFECT'
            header='INDUCED EFFECT'
            description='Employment opportunities created by the operation mean increase earnings that are largely spent locally'
          />
        </SectionCard>
        <SectionCard
          variant
          preHeader='KEY ATTRIBUTES'
          header='Most important characteristics of the Input-output model.'
          description={[{ paragraph: 'By quantifying the supply chain in different industries in an economy, input-output analysis can be used to analyze the economic impacts of an initial change in final demand. Impacts may be categorized as follows:' }]}
        >
          <>
            <SimpleCard
              header='Integral'
              description='Input-output analysis describes the interdependent supply chains between sectors within an economy.'
            >

              <IntegralSymbol />
            </SimpleCard>
            <SimpleCard
              header='Estimate'
              description='Input-output analysis describes the interdependent supply chains between sectors within an economy.'
            >

              <Estimate />
            </SimpleCard>
            <SimpleCard
              header='Estimate'
              description='In the input-output analysis model, the global economic impact of an economic event can be analysed on the basis of the initial evolution of demand and its direct, indirect and induced impacts.'
            >

              <Analysis />
            </SimpleCard>
          </>
        </SectionCard>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
