import type { NextApiRequest, NextApiResponse } from "next";
import type { FormData, MarketID, UUID } from "./io.types";

import crypto from "node:crypto";

import { FORM_DATA } from "../constants";
import { Report } from "./report-output";

// export const FORM_DATA = {
//   selectedAssetModel: 'COBALT',
//   selectedAssetMarket: 'COBALT',
//   selectedAssetModesValue: 'Base product value + value addition',
//   selectedAssetModesFirstUse: 'Average',
//   selectedAssetModesEndUse: 'Yes',
//   selectedAssetIncomeEffects: 'Yes',
//   selectedAssetMsr: 'All Products',
//   selectedAssetMsrStart: 2022,
//   selectedAssetMsrEnd: 2030,
//   selectedAssetMsrProducts: 'All Products',
//   selectedEconomyUnido: 'UNIDO/REV4',
//   selectedEconomyUnidoStart: 2010,
//   selectedEconomyUnidoEnd: 2021,
//   selectedEconomyOecd: 'OECD/2015',
//   selectedRegion: 'Europe', // 'North America',
//   generatedReportId: crypto.randomUUID(),
//   selectedReportCompiler: 'Socio-Economic Analysis Toolkit',
//   selectedReportOrg: 'Cobalt Institute',
//   selectedReportCopy: 'Socio-Economic Analyser',
//   selectedReportAuthors: 'Johann Wiebe, Carol Enache, Cesar Costas',
// };
export const handleIndustryMatrixSourceSelection = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  // here to do whatever needed to parse the request
  // const industryMatrixSources = request...
  response.status(200).json(
    [] // getRegionsFrom(industryMatrixSources)
  );
};

export const handleManufacturingSourceSelection = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  // here to do whatever needed to parse the request
  // const manufacturingSources = request...
  response.status(200).json(
    [] // getProductsFrom(manufacturingSources)
  );
};

export const handleFormRequest = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  // here to do whatever needed to parse the request
  // const formData = request...
  const formData: FormData = {
    source: {
      market: [{
        id: "COBALT | Wiebe-2019"
      }],
      model: {
        id: "COBALT | Enache-Costas-2023"
      },
      manufacturing: {
        id: "COBALT INSTITUTE 2019",
        startYear: 2022,
        endYear: 2030,
      },
      industryMatrix: [{
        id: "OECD | Wiebe 2015"
      }],
      industryMetric: [{
        id: "UNIDO | Wiebe 2015",
        startYear: 2010,
        endYear: 2021
      }],
    },
    config: {
      region: "Europe", // 'North America', 'Global';
      priceForecast: "TwentyPerCent",
      products: "All Products",
      firstUseMode: "Average",
      include: {
        commodityValueAdded: true,
        firstUseValueAdded: true,
        endSectors: true,
        incomeEffects: true,
      },
      report: {
        org: "Cobalt Institute",
        copy: "Socio-Economic Analyser",
        authors: ["Johann Wiebe", "Carol Enache", "Cesar Costas"],
      },
    },
    generated: {
      report: {
        compiler: "Socio-Economic Analysis Toolkit",
        id: crypto.randomUUID() as UUID,
      },
    },
  };

  const report = new Report();

  response.status(200).json(report);
};
