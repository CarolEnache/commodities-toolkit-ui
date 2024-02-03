import type { Report, FactorsByStageReport } from "../../../server/holistic-approach/report.types";

import { use } from "react";

import { EconomicParameters } from "../../../server/holistic-approach/report.types";

import "./styles.css";

const PrintPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="print-page">{children}</div>
);

const getData = async () => {
  const data: Report = await fetch("http://localhost:3000/api/sandbox").then(
    (r) => r.json()
  );
  return data;
};

const Tables = ({
  title,
  data,
}: {
  title: string;
  data: FactorsByStageReport;
}) => (
  <>
    <h3>{title}</h3>
    {Object.entries(data).map(([forecast, a]) => (
      <div key={`${title}-${forecast}`}>
        <table cellSpacing={0}>
          <tbody>
            <tr>
              <td rowSpan={7} className="table-vertical-header-container">
                <div className="table-vertical-header-text">{forecast}</div>
              </td>
              <td rowSpan={2}>Value Addition US$ mn</td>
              {Object.keys(a.Total).map((stage) => (
                <td key={`${title}-${forecast}-${stage}`} colSpan={2}>
                  {stage}
                </td>
              ))}
            </tr>
            <tr>
              {Object.entries(a.Total).map(([stage, b]) =>
                Object.keys(b).map((dateRange) => (
                  <td key={`${title}-${forecast}-${stage}-${dateRange}`}>
                    {dateRange}
                  </td>
                ))
              )}
            </tr>
            {Object.entries(a).map(([factor, b]) => (
              <tr key={`${title}-${forecast}-${factor}`}>
                <td>{factor}</td>
                {Object.values(b).map((dateRange) =>
                  Object.values(dateRange).map((value) => (
                    <td key={`${title}-${forecast}-${factor}-${value}`}>
                      {value}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </>
);

const Page = () => {
  const reports = use(getData());

  return (
    <div>
      {reports.map((report) => {
        return (
          <div key={report[EconomicParameters.region]}>
            <PrintPage>
              <h2>{report[EconomicParameters.region]}</h2>
              <p>
                Socio-economic analysis plays a pivotal role in understanding the intricate web of interactions between social and economic factors that shape our communities. By scrutinizing the relationships between income, education, employment, and various other socio-economic indicators, analysts can unveil patterns and trends that inform policymakers, businesses, and organizations. This in-depth examination enables a more nuanced comprehension of societal challenges, helping to identify areas in need of intervention and support. For instance, a socio-economic analysis might reveal disparities in educational attainment across different demographic groups, prompting targeted initiatives to bridge the educational gap and promote social equity. The insights derived from such analyses serve as a compass for formulating effective strategies that address the root causes of societal issues, fostering inclusive and sustainable development.
              </p>
              <p>
                Predictive models, powered by advanced algorithms and machine learning techniques, have revolutionized decision-making processes across various sectors. These models leverage historical data to forecast future trends, enabling businesses and organizations to make proactive and informed choices. In the realm of finance, predictive models analyze market trends and economic indicators to anticipate shifts, helping investors optimize their portfolios and mitigate risks. In healthcare, these models can predict disease outbreaks and aid in resource allocation for effective public health responses. Furthermore, predictive models are increasingly employed in criminal justice systems to assess the likelihood of recidivism, informing decisions about parole and rehabilitation programs. The integration of predictive modeling into decision-making processes empowers stakeholders to navigate uncertainty with greater confidence, fostering a more adaptive and resilient society.
              </p>
              <p>
                Data-driven decisions represent a paradigm shift in how organizations derive actionable insights from vast and diverse datasets. The proliferation of technology has facilitated the collection and analysis of massive amounts of data, providing valuable information for strategic decision-making. Businesses can leverage customer data to personalize marketing strategies, optimize supply chain management, and enhance overall operational efficiency. Governments can utilize data to formulate evidence-based policies that address societal challenges, such as poverty, climate change, and public health crises. However, the effective implementation of data-driven decisions requires careful consideration of ethical considerations, privacy concerns, and the responsible use of data. Striking the right balance between harnessing the power of data and safeguarding individual rights is crucial for building a trustworthy and sustainable data-driven decision-making framework in the evolving landscape of the digital age.
              </p>
            </PrintPage>
            <PrintPage>
              These tables show rows of IP Model from 70 to 166, columns:
              - Mine production : D
              - Refined production : F
              - Direct applications : SUM(J , Y)
              - End manufacturing : SUM(AA, AQ)
              - Recycling : AS

              The rows represent, in this order (each nesting is a layer deep):
              - Low = Low
              - Base = Base
              - High = High
                - Output = NOT_USED
                - Income = Labour Income
                - Value Added = Value addition
                - Employment = Employment
                - Taxes = Tax Contribution
                  - Initial effect = Direct Effect
                  - First-round coefficient (Type I) = First-round requirements = Upstream requirements
                  - Industrial support coefficient (Type I) = Industrial support = Upstream requirements
                  - Induced consumption coefficient (Type II) = Income Effect
                  - Outside of region = NOT_USED
                  - Indirect and induced, domestic = NOT_USED
                  - Total, domestic = NOT_USED

              Those 4 in the nesting, are:
                The first D25*D47, D26, D27, D28, D30
                The next 2: D25*D48, and so on increasing in the D48
                The last one has a condition: IF include income, otherwise 0
              This pattern repeats for all the columns D, F, J-Y, AA-AQ, AS 

              D26 to D28 and D30 are what you'd expect: "Labour cost", "Value Added", "Employees" and "Taxes"
              D25 is the cost of cobalt for the low scenario,
            </PrintPage>
            <PrintPage>
              <Tables title={EconomicParameters.employment} data={report[EconomicParameters.employment]} />
            </PrintPage>
            <PrintPage>
              <Tables title={EconomicParameters.labourIncome} data={report[EconomicParameters.labourIncome]} />
            </PrintPage>
            <PrintPage>
              <Tables title={EconomicParameters.taxContribution} data={report[EconomicParameters.taxContribution]} />
            </PrintPage>
            <PrintPage>
              <Tables title={EconomicParameters.valueAddition} data={report[EconomicParameters.valueAddition]} />
            </PrintPage>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
