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

const toAccumulatorKey = (...args: string[]) => args.join('-');

const getEndUseDistribution = () => {
  const commodityApplications = CoEndUseDistribution[0].slice(3);
  const rows = CoEndUseDistribution.slice(1);
  const totalByApplicationsAndYear = rows.reduce((accumulator, row) => {
    const ceva = {
      Product: `${row[CoEndUseDistributionTitles.CobaltProduct]}`,
      Year: `${row[CoEndUseDistributionTitles.Year]}`,
      Application: `${row[CoEndUseDistributionTitles.Application]}`,
    };
    // All the applications
    commodityApplications.forEach(commodityApplication => {
      const key = toAccumulatorKey(ceva.Application,ceva.Year,commodityApplication);
      accumulator[key] = accumulator[key] || 0;
      const value = Number(row[CoEndUseDistributionTitles[commodityApplication]]) || 0;
      accumulator[key] += value;
    });

    return accumulator;
  }, {} as Record<string, number>);

  const productDistributionNormalisedByYearAndProduct = rows.reduce((accumulator, row) => {
    const ceva = {
      Product: `${row[CoEndUseDistributionTitles.CobaltProduct]}`,
      Year: `${row[CoEndUseDistributionTitles.Year]}`,
      Application: `${row[CoEndUseDistributionTitles.Application]}`,
    };
    commodityApplications.forEach(commodityApplication => {
      const key = toAccumulatorKey(ceva.Application,ceva.Year,ceva.Product);
      const totalKey = toAccumulatorKey(ceva.Application,ceva.Year,commodityApplication);
      const total = totalByApplicationsAndYear[totalKey];

      const value = Number(row[CoEndUseDistributionTitles[commodityApplication]]) || 0;
      accumulator[key] = accumulator[key] || ceva;
      const normalisedValue = (value / total);
      accumulator[key][commodityApplication] = (accumulator[key][commodityApplication] || 0) + (normalisedValue || 0);
    });
    return accumulator;
  }, {} as Record<string, Record<string, number>>);

  return productDistributionNormalisedByYearAndProduct;
};

const getFirstUseDistribution = () => {
  const consumerApplications = CoFirstUseDistribution[0].slice(2);
  const rows = CoFirstUseDistribution.slice(1);
  const totalByApplicationsAndYear = rows.reduce((accumulator, row) => {
    const ceva = {
      Product: `${row[CoFirstUseDistributionTitles.CobaltProduct]}`,
      Year: `${row[CoFirstUseDistributionTitles.Year]}`,
    };
    // All the applications
    consumerApplications.forEach(consumerApplication => {
      const key = toAccumulatorKey(ceva.Year,consumerApplication);
      accumulator[key] = accumulator[key] || 0;
      const value = Number(row[CoFirstUseDistributionTitles[consumerApplication]]) || 0;
      accumulator[key] += value;
    });

    return accumulator;
  }, {} as Record<string, number>);


  const productDistributionNormalisedByYearAndProduct = rows.reduce((accumulator, row) => {
    const ceva = {
      Product: `${row[CoFirstUseDistributionTitles.CobaltProduct]}`,
      Year: `${row[CoFirstUseDistributionTitles.Year]}`,
    };
    consumerApplications.forEach(consumerApplication => {
      const key = toAccumulatorKey(ceva.Year,ceva.Product);
      const totalKey = toAccumulatorKey(ceva.Year,consumerApplication);
      const total = totalByApplicationsAndYear[totalKey];

      const value = Number(row[CoFirstUseDistributionTitles[consumerApplication]]) || 0;
      accumulator[key] = accumulator[key] || ceva;
      const normalisedValue = (value / total);
      accumulator[key][consumerApplication] = (accumulator[key][consumerApplication] || 0) + (normalisedValue || 0);
    });
    return accumulator;
  }, {} as Record<string, Record<string, number>>);

  return productDistributionNormalisedByYearAndProduct;
};

export const msr = () => {
  // REGION


  // CALC


  // CoEndUseTitles
  // CoEndUseDistributionTitles
  // CoFirstUseTitles
  // CoFirstUseDistributionTitles
  return {
    CoEndUse: CoEndUse[0].slice(3),
    //   CoEndUse: CoEndUse[0],
    CoFirstUse: CoFirstUse[0].slice(2),
  //   CoFirstUse: CoFirstUse[0],
    CoEndUseDistribution: getEndUseDistribution(),
    CoFirstUseDistribution: getFirstUseDistribution(),
  //   MSRRawData: ,

  };
}
