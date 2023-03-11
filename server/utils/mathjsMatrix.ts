import { ArgValue, ColumnName, MatrixIndex, RowName, Table, Row, CellValue } from "./types";

class Matrix {
  cols: ColumnName[]; // Column labels, for searching/debugging | A,B,C,D
  rows: RowName[]; // Row labels, for searching/debugging | 1,2,3,4
  matrix: Table; // This is an array of arrays to be used in mathjs

  constructor(matrix ?: Matrix) {
    this.cols = matrix?.cols ? structuredClone(matrix.cols) as ColumnName[] : [];
    this.rows = matrix?.rows ? structuredClone(matrix.rows) as RowName[] : [];
    this.matrix = matrix?.matrix ? structuredClone(matrix.matrix) as Table : [[]];
  }

  getColIndex(col: ColumnName): MatrixIndex {
    let index = this.cols.indexOf(col); // We search the col title
    if (index === -1) { // If not found we add it
      index = this.cols.length;
      this.cols.push(col);
    }
    return index;
  }

  getColAsArray(colIndex: MatrixIndex): CellValue[] {
    return this.matrix.map(row => row[colIndex]);
  }

  getColAsArrayByName(col: ColumnName): CellValue[] {
    return this.getColAsArray(this.getColIndex(col));
  }

  getRowIndex(row: RowName): MatrixIndex {
    let index = this.rows.indexOf(row); // We search the row title
    if (index === -1) { // If not found we add it
      index = this.rows.length;
      this.rows.push(row);
    }
    return index;
  }

  setValue(rowIndex: MatrixIndex, colIndex: MatrixIndex, value: ArgValue) { 
    const outputMatrix = this.matrix;
    if (!outputMatrix[rowIndex]) {
      outputMatrix[rowIndex] = [];
    }
    outputMatrix[rowIndex][colIndex] = typeof value === 'function' ? value(outputMatrix[rowIndex][colIndex] || 0) : value;
  }

  getRow(rowName: RowName): Row {
    const rowIndex = this.getRowIndex(rowName);
    return this.matrix[rowIndex];
  }

  setRow(rowName: RowName, rowValues: Row) {
    this.rows.push(rowName);
    this.matrix.push(rowValues);
  }

  setValueByName(row: RowName, col: ColumnName, value: ArgValue) {
    this.setValue(this.getRowIndex(row), this.getColIndex(col), value);
  }

  getValue(rowIndex: MatrixIndex, colIndex: MatrixIndex) {
    return this.matrix[rowIndex][colIndex];
  }

  getValueByName(row: RowName, col: ColumnName) {
    return this.getValue(this.getRowIndex(row), this.getColIndex(col));
  }

  removeCol(col: ColumnName) {
    const colIndex = this.getColIndex(col);
    this.cols.splice(colIndex, 1);
    this.matrix.forEach(row => row.splice(colIndex, 1));
  } 
}

export default Matrix;
