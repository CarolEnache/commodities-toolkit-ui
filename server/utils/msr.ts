import { request } from "http";
import {
  CoEndUse,
  CoFirstUse,
  CoEndUseDistribution,
  CoFirstUseDistribution,
  MSRRawData,
} from "./dataStorage";
import { CoEndUseDistributionTitles, CoEndUseTitles, CoFirstUseDistributionTitles, CoFirstUseTitles } from "./types";

// TODO - Reach out to Johann to share the RAWdata for the CoEndUse, CoFirstUse

export const msr = () => {
  // PRODUCT DISTRIBUTION
  const commodityApplications = Object.keys(CoEndUseDistributionTitles).filter(commodityApplication => {
    // We discard the 2 non-applications
    if (commodityApplication === 'Year' || commodityApplication === 'CobaltProduct' || commodityApplication === 'Application') return false;

    if (isNaN(Number(commodityApplication))) return true;

    return false;
  });

  const productDistributionNormalisedByYearAndProduct = CoEndUseDistribution.slice(1).reduce((accumulator, current) => {
    const ceva = {
      Product: current[CoEndUseDistributionTitles.CobaltProduct],
      Year: current[CoEndUseDistributionTitles.Year],
      Application: current[CoEndUseDistributionTitles.Application],
    };
    // All the applications
    commodityApplications.forEach(commodityApplication => {
      accumulator[`${ceva.Year},${commodityApplication}`] = accumulator[`${ceva.Year},${commodityApplication}`] || { TOTAL: 0 };
      const value = current[CoEndUseDistributionTitles[commodityApplication]] || 0;
      accumulator[`${ceva.Year},${commodityApplication}`][ceva.Product] = (accumulator[`${ceva.Year},${commodityApplication}`][ceva.Product] || 0) + value;
      accumulator[`${ceva.Year},${commodityApplication}`].TOTAL += value;
    });
    
    return accumulator;
  }, {});

  return productDistributionNormalisedByYearAndProduct;

  // REGION


  // CALC


  // CoEndUseTitles
  // CoEndUseDistributionTitles
  // CoFirstUseTitles
  // CoFirstUseDistributionTitles
  // return {
  //   CoEndUse: CoEndUse[0],
  //   CoFirstUse: CoFirstUse[0],
  //   CoEndUseDistribution: CoEndUseDistribution[0],
  //   CoFirstUseDistribution: CoFirstUseDistribution[0],
  //   MSRRawData: ,
  
  // };
}
