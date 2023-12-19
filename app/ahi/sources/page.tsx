import { use } from "react";

const getMarketSources = () => fetch('http://localhost:3000/api/get-market-sources').then(r => r.json());
const getModelSources = () => fetch('http://localhost:3000/api/get-model-sources').then(r => r.json());
const getManufacturingSources = () => fetch('http://localhost:3000/api/get-manufacturing-sources').then(r => r.json());
const getIndustryMatrixSources = () => fetch('http://localhost:3000/api/get-industry-matrix-sources').then(r => r.json());
const getIndustryMetricSources = () => fetch('http://localhost:3000/api/get-industry-metric-sources').then(r => r.json());
const getRegions = () => fetch('http://localhost:3000/api/get-regions').then(r => r.json());
const getProducts = () => fetch('http://localhost:3000/api/get-products').then(r => r.json());

const Page = () => {
  const marketSources = use(getMarketSources());
  const modelSources = use(getModelSources());
  const manufacturingSources = use(getManufacturingSources());
  const industryMatrixSources = use(getIndustryMatrixSources());
  const industryMetricSources = use(getIndustryMetricSources());
  const regions = use(getRegions());
  const products = use(getProducts());

  return (
    <div>
      <p>marketSources: {JSON.stringify(marketSources)}</p>
      <p>modelSources: {JSON.stringify(modelSources)}</p>
      <p>manufacturingSources: {JSON.stringify(manufacturingSources)}</p>
      <p>industryMatrixSources: {JSON.stringify(industryMatrixSources)}</p>
      <p>industryMetricSources: {JSON.stringify(industryMetricSources)}</p>
      <p>regions: {JSON.stringify(regions)}</p>
      <p>products: {JSON.stringify(products)}</p>
    </div>
  )
};

export default Page;
