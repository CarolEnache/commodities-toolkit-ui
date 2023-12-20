import { useEffect, useState } from "react";
import { FormEvent } from "react";

const ReportConfig = () => {
  const [marketSources, setMarketSources] = useState();
  const [modelSources, setModelSources] = useState();
  const [manufacturingSources, setManufacturingSources] = useState();
  const [industryMatrixSources, setIndustryMatrixSources] = useState();
  const [industryMetricSources, setIndustryMetricSources] = useState();
  const [regions, setRegions] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/api/get-market-sources")
      .then((res) => res.json())
      .then((data) => {
        setMarketSources(data);
      });
    fetch("http://localhost:3000/api/get-model-sources")
      .then((res) => res.json())
      .then((data) => {
        setModelSources(data);
      });

    fetch("http://localhost:3000/api/get-manufacturing-sources")
      .then((r) => r.json())
      .then((data) => {
        setManufacturingSources(data);
      });
    fetch("http://localhost:3000/api/get-industry-matrix-sources")
      .then((r) => r.json())
      .then((data) => {
        setIndustryMatrixSources(data);
      });

    fetch("http://localhost:3000/api/get-industry-metric-sources")
      .then((r) => r.json())
      .then((data) => {
        setIndustryMetricSources(data);
      });
    fetch("http://localhost:3000/api/get-regions")
      .then((r) => r.json())
      .then((data) => {
        setRegions(data);
      });
    fetch("http://localhost:3000/api/get-products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  console.log({
    marketSources,
    modelSources,
    manufacturingSources,
    industryMatrixSources,
    industryMetricSources,
    regions,
    products,
  });

  async function onSubmitConfig(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/sandbox", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    // console.log(data);
  }
  return (
    <div>
      <main>
        <form onSubmit={onSubmitConfig}>
          <input type="text" name="name" />
          <button type="submit">Submit</button>
          {/* metals markets  */}
          {/* region */}
          {/* products */}
          {/* firstUseMode */}
          {/* commodityValueAdded */}
          {/* firstUseValueAdded */}
          {/* endSectors */}
          {/* incomeEffects */}
          {/* authors */}
        </form>
      </main>
    </div>
  );
};

export default ReportConfig;
