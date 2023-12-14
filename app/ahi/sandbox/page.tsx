import { use } from "react";
import { Report } from "../../../server/holistic-approach/report-output";

const getData = async () => {
  const data: Report = await fetch('http://localhost:3000/api/sandbox').then(r => r.json());
  return data;
};

const Page = () => {
  const report = use(getData());

  return <div>{JSON.stringify(report)}</div>
}

export default Page;
