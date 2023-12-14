import { FormData } from "./io.types";
import { getRegionsFrom } from "./selectors";

type DataPoint = number;

interface DataWithForecast {
  base: DataPoint;
  high: DataPoint;
  low: DataPoint;
}

enum EconomicFactors {
  DirectEffect = "Direct Effect",
  // FirstRound = "First Round",
  // InternationalSupport = "International Support",
  UpstreamRequirements = "Upstream Requirements",
  IncomeEffect = "Income Effect",
  Total = "Total",
  Change = "Change",
}

enum ManufacturingStage {
  Mining = "Mine Production",
  Refining = "Refined Production",
  FirstUse = "Direct Applications",
  EndUse = "End Manufactoring",
  Recycling = "Recycling",
  Total = "Total",
}

enum ForecastingGroup {
  LOW = "LOW",
  BASE = "BASE",
  HIGH = "HIGH",
}

type YearRangeString = `${string}-${string}`;
// Properties exist
export type FactorsByStageReport = Record<
  ForecastingGroup,
  Record<
    EconomicFactors,
    Record<ManufacturingStage, Record<YearRangeString, number>>
  >
>;
// Properties are optional while building
type FactorsByStageReportBuilder = {
  [A in ForecastingGroup]?: {
    [B in EconomicFactors]?: {
      [C in ManufacturingStage]?: {
        [D in YearRangeString]?: number;
      };
    };
  };
};
export const generateFactorsByStage = (
  formData: FormData
): FactorsByStageReport => {
  const factorsByStage: FactorsByStageReportBuilder = {};

  for (const forecastGroup of Object.values(ForecastingGroup)) {
    factorsByStage[forecastGroup] = {};
    for (const economicFactor of Object.values(EconomicFactors)) {
      factorsByStage[forecastGroup]![economicFactor] = {};

      for (const manufacturingStage of Object.values(ManufacturingStage)) {
        factorsByStage[forecastGroup]![economicFactor]![manufacturingStage] =
          {};
      }

      for (const manufacturingStage of Object.values(ManufacturingStage)) {
        if (manufacturingStage === "Total") continue;

        const past: YearRangeString = `${formData.source.industryMetric[0].startYear}-${formData.source.industryMetric[0].endYear}`;
        const future: YearRangeString = `${formData.source.manufacturing.startYear}-${formData.source.manufacturing.endYear}`;
        factorsByStage[forecastGroup]![economicFactor]![manufacturingStage]![
          past
        ] = 1;
        factorsByStage[forecastGroup]![economicFactor]![manufacturingStage]![
          future
        ] = 1.2;
        factorsByStage[forecastGroup]![economicFactor]!["Total"]![past] =
          (factorsByStage[forecastGroup]![economicFactor]!["Total"]![past] ||
            0) +
          (factorsByStage[forecastGroup]?.[economicFactor]?.[
            manufacturingStage
          ]?.[past] || 0);
        factorsByStage[forecastGroup]![economicFactor]!["Total"]![future] =
          (factorsByStage[forecastGroup]![economicFactor]!["Total"]![future] ||
            0) +
          (factorsByStage[forecastGroup]?.[economicFactor]?.[
            manufacturingStage
          ]?.[future] || 0);
      }
    }
  }

  return factorsByStage as FactorsByStageReport;
};

interface RegionalReport {
  region: string,
  employment: FactorsByStageReport,
  labourIncome: FactorsByStageReport,
  taxContribution: FactorsByStageReport,
  valueAddition: FactorsByStageReport,
}
export type Report = RegionalReport[];

export const generateReport = async (formData: FormData): Promise<Report> => {
  const regions = getRegionsFrom(formData.source.industryMatrix[0].id);

  return regions.map((region) => {
    return {
      region,
      employment: generateFactorsByStage(formData),
      labourIncome: generateFactorsByStage(formData),
      taxContribution: generateFactorsByStage(formData),
      valueAddition: generateFactorsByStage(formData),
    };
  });
};
