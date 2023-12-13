import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";

import { handleFormRequest } from "../../server/holistic-approach/query-handlers";
import {
  getRegionsFrom,
  getProductsFrom,
} from "../../server/holistic-approach/selectors";
import { formData } from "../../server/holistic-approach/hardcoded-mocks";
import { generateReport } from "../../server/holistic-approach/report-output";

const AHI: NextPage = () => {
  const [selectedIndustryMatrixSource] = useState("OECD | Wiebe 2015");
  const [selectedManufacturingSource] = useState("COBALT INSTITUTE 2019");
  const [report, setReport] = useState<>();

  const regions = getRegionsFrom(selectedIndustryMatrixSource);
  const products = getProductsFrom(selectedManufacturingSource);

  useMemo(() => {
    const data = structuredClone(formData);
    data.source.industryMatrix = [{ id: selectedIndustryMatrixSource }];
    data.source.manufacturing = { id: selectedManufacturingSource };

    generateReport(data).then(setReport);
  }, [selectedIndustryMatrixSource, selectedManufacturingSource]);
};

export default AHI;
