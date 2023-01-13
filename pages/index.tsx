import { useState } from 'react'
import Hamburger from 'hamburger-react'

import Link from 'next/link'
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
        <Hamburger color='#012d49' toggled={isOpen} toggle={setOpen} direction='right' />
        {isOpen && <Navigation />}
      </div>


      <main className={styles.main}>
        <Navigation />
        <div className={styles.contactUsCta}>
          <Link href="/contact" >
            Contact us
          </Link>
        </div>

        <SectionCard
          preHeader='Economic Impact Assessment Modelling'
          header='SEA Modelling as an Economic Impact Assessment Tool'
          description={[{
            paragraph: 'We built the first Socio Economic Analysis model that provides insights in the economic impact for a any commodity. It displays the interactive connections between various sectors and addresses their input and output factors, measuring the value add.'

          },
          {
            paragraph: 'The SEA Impact Assessment Tool was specifically designed to quantify the contribution one or multiple commodities can have to a society. This contribution is expressed in either capital, usd$, for value add, labour income and tax revenues, or actual jobs in the case of full and part time employment contributions.'

          }
          ]}
          svg='/person.svg'
        />
        <SectionCard
          variant
          center
          preHeader='Data Driven'
          header='A Foundation Built on Rock Solid Data.'
          description={[{ paragraph: 'The platform is intuitive and easy to use and based on a strong theoretical foundation structured and organised on rock solid calculations. All the data is stored in a database. Data forms the pillars and cornerstones of the architecture of the platform. Data is fed into the model, its forms the basis in the transformation process and generates the output results.' }]}
        >
          <>
            <SimpleCard
              header='Fully Automated'
              svg='/automated.svg'
              description='Automation stands front and centre in the way the data input, transformation and display of results is processes are organised. Most of the data transformation and output is automated, to eliminate errors and miscalculations, but allows for tailored flexibility in displaying results.'
            />
            <SimpleCard
              svg='/digital.svg'
              header='Digital Transformative'
              description='All our data results are displayed in easy-to-understand interactive dashboard. The SEA model illustrates the story behind the data structured and easy to comprehend. Extensive use of visuals, such as charts, tables and other illustrations will bring the complexity of the model to life and can be easily used for external communication in presentations.'
            />
            <SimpleCard
              header='Hyper Targeted'
              description='Despite its size, the platform is lean, but flexible, vast and hyper targeted. It permits to home in on characteristics chosen to quantify the impacts. Its flexibility allows the quantification of the contribution to alter between a focus on a specific commodity market or a part of the value chain.'
              svg='/target.svg'
            />
          </>
        </SectionCard>
        <SectionCard
          preHeader='Much More then Detailed Insights'
          header='Enhanced Transparency & Insights.'
          description={[{ paragraph: 'The platform provides much more than a general understanding of a commodity market. It allows you to interrogate each stage of the value chain, from production to downstream use and recycling, and assess the direct, indirect and induced effects the commodity is contributing to the economy in a country, region or world. This can be done for one year or a period, in the past or in the future.' }]}
          svg='/insight.svg'
        />

        <SectionCard
          preHeader='IMPACTS'
          header='Kinds of impacts in the input-output analysis.'
          description={[{ paragraph: 'By quantifying the supply chain in different industries in an economy, input-output analysis can be used to analyze the economic impacts of an initial change in final demand. Impacts may be categorized as follows:' }]}
          svg='/impact.svg'
          desktopOnlySVG
          variant
        >
          <DescriptionCard
            preHeader='INITIAL EFFECT'
            header='DIRECT EFFECT'
            description='Goods, consumables and services purchased directly by the mining operation or project'
          />
          <DescriptionCard
            preHeader={`FIRST ROUND & INDUSTRIAL SUPPORT`}
            header='INDIRECT EFFECT'
            description='Suppliers of steel, cement, etc. will themselves trigger further demand for energy, chemicals transport, etc'
          />
          <DescriptionCard
            preHeader='INCOME EFFECT'
            header='INDUCED EFFECT'
            description='Employment opportunities created by the operation mean increase earnings that are largely spent locally'
          />
        </SectionCard>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
