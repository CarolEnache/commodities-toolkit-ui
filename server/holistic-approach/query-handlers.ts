import type { NextApiRequest, NextApiResponse } from "next";

import { generateReport } from "./report-output";
import { formData } from "./hardcoded-mocks";
import { getProductsFrom, getRegionsFrom } from "./selectors";

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

  generateReport(formData).then(report => {
    response.status(200).json(report);
  });
};
