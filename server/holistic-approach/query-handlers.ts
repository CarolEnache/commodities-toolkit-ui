import type { NextApiRequest, NextApiResponse } from "next";

import { generateReport } from "./report-output";
import { formData } from "./hardcoded-mocks";
import { getProductsFrom, getRegionsFrom } from "./selectors";

export const getMarketSources = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  response
    .status(200)
    .json(["COBALT | Enache-Costas-2023", "!NICKEL", "!COPPER", "!HYDROGEN"]);
};
export const getModelSources = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  response
    .status(200)
    .json(["COBALT | Wiebe-2019", "!NICKEL", "!COPPER", "!HYDROGEN"]);
};
export const getManufacturingSources = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  response.status(200).json(["COBALT INSTITUTE 2019"]);
};
export const getIndustryMatrixSources = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  response.status(200).json(["UNIDO | Wiebe 2015"]);
};
export const getIndustryMetricSources = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  response.status(200).json(["OECD | Wiebe 2015"]);
};

export const handleIndustryMatrixSourceSelection = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const industryMatrixSources = request.body;
  response.status(200).json(getRegionsFrom(industryMatrixSources));
};

export const handleManufacturingSourceSelection = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const manufacturingSources = request.body;
  response.status(200).json(getProductsFrom(manufacturingSources));
};

export const handleFormRequest = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  // here to do whatever needed to parse the request
  // const formData = request...

  console.log("request.body from report-configuration", request.body);

  generateReport(formData).then((report) => {
    response.status(200).json(report);
  });
};
