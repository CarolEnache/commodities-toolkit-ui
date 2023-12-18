import type {
  FactorsByStageReport,
  Report,
} from "../../../server/holistic-approach/report-output";

import { use } from "react";

import './styles.css';

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
            <td rowSpan={7} className="table-vertical-header-container"><div className="table-vertical-header-text">{forecast}</div></td>
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
                    <td key={`${title}-${forecast}-${factor}-${dateRange}`}>
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
          <div key={report.region}>
            <PrintPage>
              <h2>{report.region}</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit arcu id justo suscipit lobortis. Cras consequat ante enim, vel vehicula purus fringilla id. Curabitur eu ultrices nunc. Nulla ut malesuada lectus. Suspendisse et sem sed leo lacinia sagittis quis et justo. Nulla eros metus, imperdiet ut aliquam at, vehicula vel massa. Integer nec aliquam lectus, eu tempor tellus. Quisque eget enim tellus. Maecenas scelerisque magna at lorem molestie ultrices. Duis facilisis metus venenatis dui dictum ullamcorper. Nulla arcu nisl, lobortis ut feugiat sit amet, pulvinar ac enim. Nulla fringilla, quam ac blandit porta, velit libero molestie ante, nec congue nibh eros nec dolor.

Curabitur ac vulputate erat. Sed imperdiet arcu eget mauris porttitor, nec aliquam eros consequat. Nullam rutrum, libero sit amet porttitor malesuada, ex neque tempus elit, et lacinia nunc tellus ac magna. Mauris posuere scelerisque sem eget varius. Pellentesque malesuada tempor sem, id bibendum ante blandit id. Praesent finibus dolor mi, ut convallis lacus sodales at. Morbi placerat convallis lorem, ac pretium turpis consequat in. Nam a nisi quis tellus feugiat tincidunt sed non dui. Praesent urna tellus, iaculis a sollicitudin blandit, pharetra non urna. Nullam suscipit dolor non nisi bibendum vestibulum. In scelerisque nisl ornare ante sagittis molestie. Nullam malesuada ex quis gravida posuere. Ut blandit libero pulvinar ante scelerisque, sed volutpat lacus mollis. Vivamus rhoncus ipsum eget volutpat mollis. Suspendisse felis arcu, rhoncus eget gravida eu, cursus dictum nisi.

Etiam orci lacus, fringilla cursus velit faucibus, interdum efficitur lacus. Etiam gravida massa lorem. Sed ornare, dolor id elementum suscipit, ex massa pretium ipsum, at pretium magna nunc non sem. Maecenas aliquet nec elit non hendrerit. Cras pharetra quis nulla nec suscipit. Aenean efficitur sollicitudin libero, at hendrerit magna congue non. Vivamus accumsan dignissim lacus bibendum porttitor. Aliquam sodales egestas semper. Mauris vel purus non tortor accumsan pellentesque. Donec in dapibus mauris, quis dictum risus. Phasellus suscipit malesuada turpis sed interdum. Nullam ornare dui sit amet erat pulvinar feugiat. Donec rutrum enim nec nisi egestas aliquam ac sit amet nibh. Maecenas pulvinar, dui et dictum consequat, sem justo tempus velit, non scelerisque mauris ipsum sed tellus. Praesent ut massa quis turpis ornare rhoncus finibus in ligula.

Phasellus lacinia justo vitae mi vehicula bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ornare lacinia ante et sodales. Sed nisl sem, finibus dapibus diam non, bibendum varius quam. Praesent eget accumsan est, a faucibus tortor. Integer porttitor odio sit amet tempor semper. Nam a sem quis nisi posuere porttitor. Sed dapibus maximus dolor, posuere sollicitudin felis aliquam vitae. Ut id cursus dolor. Donec posuere aliquet tellus pharetra laoreet. Nulla consequat suscipit odio, quis lobortis eros elementum vitae. Duis et urna posuere, venenatis dolor eget, aliquet augue. Curabitur ipsum neque, condimentum sit amet nulla sit amet, sodales placerat enim. In non posuere nisi. Aenean tincidunt vulputate tellus non posuere. Suspendisse potenti.

Curabitur eget mauris magna. Proin suscipit tincidunt ante, sed rhoncus diam porta in. Sed gravida elementum quam vel ornare. Phasellus maximus tellus orci, in hendrerit nunc sodales quis. Sed consectetur accumsan maximus. Duis euismod dictum neque vitae consectetur. Vestibulum interdum ipsum ac rutrum mollis. Duis aliquam turpis mauris, faucibus maximus mi tincidunt vitae. Morbi mattis ornare mauris, euismod ultricies sem faucibus in. Mauris nibh neque, tincidunt nec dolor nec, dictum ultrices nibh. Suspendisse eget malesuada neque, tempor pulvinar elit.</p>
            </PrintPage>
            <PrintPage>
              <Tables title="Employment" data={report.employment} />
            </PrintPage>
            <PrintPage>
              <Tables title="Labour Income" data={report.labourIncome} />
            </PrintPage>
            <PrintPage>
              <Tables title="Tax Contribution" data={report.taxContribution} />
            </PrintPage>
            <PrintPage>
              <Tables title="Value Addition" data={report.valueAddition} />
            </PrintPage>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
