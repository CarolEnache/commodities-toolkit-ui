import Matrix from "./mathjsMatrix";

export enum OECDRawTitles {
  VAR,
  Variable,
  COU,
  Country,
  Region,
  ROW,
  From,
  COL,
  To,
  TIME,
  Time,
  UnitCode,
  Unit,
  PowerCodeCode,
  PowerCode,
  ReferencePeriodCode,
  ReferencePeriod,
  Value,
}

export enum OECDRawVariables {
  DOMESTIC = "DOMIMP", // Domestic output and imports
  TOTAL = "TTL",
  VALUE_ADDED = "VAL",
}

export enum OECDEmploymentTitles {
  VAR,
  Indicator,
  COU,
  Country,
  Region,
  PAR,
  Partner,
  IND,
  Industry,
  TIME,
  Time,
  UnitCode,
  Unit,
  PowerCodeCode,
  PowerCode,
  ReferencePeriodCode,
  ReferencePeriod,
  Value,
  FlagCodes,
  Flags,
}

export type MatrixIndex = number;
export type ColumnName = string;
export type RowName = string;

export type CellValue = string | number;
export type Row = CellValue[];
export type Table = Row[];

export type ArgValue = CellValue | ((previousValue: CellValue) => CellValue);

export type OECDVariableSheet = { [P in OECDRawVariables]?: Matrix };

export enum UnidoTitles {
  TableCode,
  TableDescription,
  CountryCode,
  CountryDescription,
  Year,
  ISIC,
  ISICDescription,
  ISICCombination,
  Value,
  TableDefinitionCode,
  TableDescriptionLong,
  SourceCode,
  Unit,
  Region,
}

export type AccumulatorIndexCacheType = Record<string, number>;
export type UnideRAVtype = string[][];
export type RestructuredCurrentType = {
  "Table Description": string;
  Region: string;
  Year: string;
  ISIC: string;
  Value: number;
};
