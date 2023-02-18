/**
 * Review of the previous table-matrix.mjs
 */
import { MathCollection } from "mathjs";

class Matrix {
  cols: string[] = []; // Column labels, for searching/debugging
  rows: string[] = []; // Row labels, for searching/debugging

  matrix: MathCollection = []; // This is an array of arrays to be used in mathjs
}

export default Matrix;
