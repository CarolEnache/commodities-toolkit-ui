export type MatrixIndex = number;
export type ColumnName = string;
export type RowName = string;

export type CellValue = string | number;
export type Row = CellValue[];
export type Table = Row[];

export type ArgValue = CellValue | ((previousValue: CellValue) => CellValue);