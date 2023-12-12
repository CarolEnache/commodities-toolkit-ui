type DataPoint = number;

interface DataWithForecast {
  base: DataPoint;
  high: DataPoint;
  low: DataPoint;
}

enum EconomicFactors {
  DirectEffects = "Direct Effects",
  FirstRound = "First Round",
  InternationalSupport = "International Support",
  IncomeEffect = "Income Effect",
}

enum ManufacturingStage {
  Mining = "Mining",
  Refining = "Refining",
  FirstUse = "First Use",
  EndUse = "End Use",
  Recycling = "Recycling",
}

interface ReportEntry {
  employees: DataWithForecast;
  factor: EconomicFactors;
  labour: DataWithForecast;
  output: DataWithForecast;
  stage: ManufacturingStage;
  tax: DataWithForecast;
  value: DataWithForecast;
}

export class Report {
  factorsByStage: ReportEntry[] = [];
  prices: any;

  constructor() {
    for (const manufacturingStage of Object.values(ManufacturingStage)) {
      for (const economicFactor of Object.values(EconomicFactors)) {
        const entry: ReportEntry = {
          employees: { base: 0, high: 0, low: 0 },
          factor: economicFactor,
          labour: { base: 0, high: 0, low: 0 },
          output: { base: 0, high: 0, low: 0 },
          stage: manufacturingStage,
          tax: { base: 0, high: 0, low: 0 },
          value: { base: 0, high: 0, low: 0 },
        };
        this.factorsByStage.push(entry);
      }
    }
  }
}
