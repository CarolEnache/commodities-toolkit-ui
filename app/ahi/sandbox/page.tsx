import type {
  FactorsByStageReport,
  Report,
} from "../../../server/holistic-approach/report-output";

import { use } from "react";

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
        <h4>{forecast}</h4>
        <table>
          <tr>
            <td></td>
            {Object.keys(a.Total).map((stage) => (
              <td key={`${title}-${forecast}-${stage}`} colSpan={2}>
                {stage}
              </td>
            ))}
          </tr>
          <tr>
            <td></td>
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
                  <td key={`${title}-${forecast}-${factor}-${dateRange}`}>
                    {value}
                  </td>
                ))
              )}
            </tr>
          ))}
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
          <div key={report.region}>
            <h2>{report.region}</h2>
            <Tables title="Employment" data={report.employment} />
            <Tables title="Labour Income" data={report.labourIncome} />
            <Tables title="Tax Contribution" data={report.taxContribution} />
            <Tables title="Value Addition" data={report.valueAddition} />
          </div>
        );
      })}
    </div>
  );
};

export default Page;
