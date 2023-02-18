import { OECDRawInputOutput } from './dataStorage';
import Matrix from './mathjsMatrix';
import leontief from './leontief';
import { OECD_UNUSED_COLS, OECD_UNUSED_ROWS } from '../constants';
import { REGIONS } from './auxiliary';

type CellValue = string | number | any;
type Row = CellValue[];
export type Table = Row[];

enum OECDRawTitles {
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
  Value
}

enum OECDRawVariables {
  DOMESTIC = 'DOMIMP', // Domestic output and imports
  TOTAL = 'TTL',
  VALUE_ADDED = 'VAL',
}

export const oecdCoeficients = ({ selectedRegion = REGIONS.GLOBAL } = {}) => {
    const OECDRawData: Table = OECDRawInputOutput
      .slice(1) // Remove the sheet titles
      .filter(
        (row: Row) => {
          // COL is not in unused cols
          if (OECD_UNUSED_COLS.includes(`${row[OECDRawTitles.COL]}`)) {
            return false;
          }
          // ROWS is not in unused rows
          if(OECD_UNUSED_ROWS.includes(`${row[OECDRawTitles.ROW]}`)) {
            return false;
          }
          // Filter by region if it's not Global
          if(selectedRegion && selectedRegion !== REGIONS.GLOBAL) {
            // And it's not the selected region
            if(row[OECDRawTitles.Region] !== selectedRegion) {
              return false;
            }
          }

          if (row[OECDRawTitles.VAR] === OECDRawVariables.VALUE_ADDED) {
            return true;
          }

          return false;
        });

  return OECDRawData;
// <<<<<<< Reviewing
//     const oecdInputs: Record<string, Matrix> = {
//       DOMIMP: new Matrix(),
//       TTL: new Matrix(),
//       VAL: new Matrix(),
//     };
//     OECDRawData.forEach((oRow) => {
//       const VAR = oRow[5] === 'VALU' ? 'VAL' : `${oRow[0]}`;
//       const ROW = `${oRow[5]}`;
//       const COL = `${oRow[7]}`;
//       const POW = parseFloat(`${oRow[13]}`);
//       const VAL = parseFloat(`${oRow[13]}`);

//       const output = oecdInputs[VAR];
//       let rowIndex = output.rows.indexOf(ROW);
//       if (rowIndex === -1) {
//         output.rows.push(ROW);
//         rowIndex = output.rows.indexOf(ROW);
//       }
//       let colIndex = output.cols.indexOf(COL);
//       if (colIndex === -1) {
//         output.cols.push(COL);
//         colIndex = output.cols.indexOf(COL);
//       }

      
//       const outputMatrix = output.matrix as number[][];
//       if (!outputMatrix[rowIndex]) {
//         outputMatrix[rowIndex] = [];
//       }
//       outputMatrix[rowIndex][colIndex] =
//         (outputMatrix[rowIndex][colIndex] || 0) + POW * VAL;
//     });
// =======

//     const oecdRawValue = OECDRawIO.filter((oRow) => oRow[0] === 'VAL');
//     oecdRawValue.forEach((oRow) => {
//       const VAR = oRow[0];
//       const ROW = oRow[5];
//       const COL = oRow[7];
//       const POW = oRow[13];
//       const VAL = oRow[17];

//       const output = oecdInputs[VAR];
//       if (!output) return;

//       let rowIndex = output.rows.indexOf(ROW);
//       if (rowIndex === -1) {
//         output.rows.push(ROW);
//         rowIndex = output.rows.indexOf(ROW);
//       }
//       let colIndex = output.cols.indexOf(COL);
//       if (colIndex === -1) {
//         output.cols.push(COL);
//         colIndex = output.cols.indexOf(COL);
//       }

//       if (!output.matrix[rowIndex]) {
//         output.matrix[rowIndex] = [];
//       }
//       output.matrix[rowIndex][colIndex] =
//         (output.matrix[rowIndex][colIndex] || 0) + POW * VAL;
//     });

//     const oecdTypePrimitive = {
//       DOMIMP: { cols: [], rows: [], matrix: [] },
//       TTL: { cols: [], rows: [], matrix: [] },
//     };
//     OECDRawIO.filter(
//       (oRow) => oRow[5] !== 'OUTPUT' && oRow[5] !== 'VALU' && oRow[0] !== 'VAL'
//     ).forEach((oRow) => {
//       const VAR = oRow[0];
//       const ROW = oRow[5];
//       const COL = oRow[7];
//       const POW = oRow[13];
//       const VAL = oRow[17];

//       const output = oecdTypePrimitive[VAR];
//       const total = oecdInputs[VAR];
//       if (!output) return;
//       if (ROW.match(/^IMP_/)) return;

//       let rowIndex = output.rows.indexOf(ROW);
//       if (rowIndex === -1) {
//         output.rows.push(ROW);
//         rowIndex = output.rows.indexOf(ROW);
//       }
//       let colIndex = output.cols.indexOf(COL);
//       if (colIndex === -1) {
//         output.cols.push(COL);
//         colIndex = output.cols.indexOf(COL);
//       }
//       const totalColIndex = total.cols.indexOf(COL);

//       if (!output.matrix[rowIndex]) {
//         output.matrix[rowIndex] = [];
//       }
//       const totalValue = total.matrix[0][totalColIndex];
//       output.matrix[rowIndex][colIndex] =
//         (output.matrix[rowIndex][colIndex] || 0) +
//         (POW * VAL) / (totalValue || 1);
//     });

//     const col_HFCE_TTL = oecdTypePrimitive.TTL.cols.indexOf('HFCE');
//     const col_HFCE_DOMIMP = oecdTypePrimitive.DOMIMP.cols.indexOf('HFCE');
//     const row_LABR_VAL = oecdInputs.VAL.rows.indexOf('LABR');
//     const oecdTypeI = {
//       TTL: {
//         cols: oecdTypePrimitive.TTL.cols.filter((v, i) => i !== col_HFCE_TTL),
//         rows: oecdTypePrimitive.TTL.rows,
//         matrix: oecdTypePrimitive.TTL.matrix.map((oRow) =>
//           oRow.filter((v, i) => i !== col_HFCE_TTL)
//         ),
//       },
//       DOMIMP: {
//         cols: oecdTypePrimitive.DOMIMP.cols.filter(
//           (v, i) => i !== col_HFCE_DOMIMP
//         ),
//         rows: oecdTypePrimitive.DOMIMP.rows,
//         matrix: oecdTypePrimitive.DOMIMP.matrix.map((oRow) =>
//           oRow.filter((v, i) => i !== col_HFCE_DOMIMP)
//         ),
//       },
//     };
//     const oecdTypeII = {
//       TTL: {
//         cols: oecdTypePrimitive.TTL.cols,
//         row: oecdTypePrimitive.TTL.rows.concat(['Labour Cost']),
//         matrix: oecdTypePrimitive.TTL.matrix.concat([
//           oecdTypePrimitive.TTL.cols.map((oCol) => {
//             const COL = oecdInputs.VAL.cols.indexOf(oCol);
//             const labrValue = oecdInputs.VAL.matrix[row_LABR_VAL][COL] || 0;
//             // TODO: Add the minimum check from the other table
//             return Math.min(labrValue);
//           }),
//         ]),
//       },
//       DOMIMP: {
//         cols: oecdTypePrimitive.DOMIMP.cols,
//         row: oecdTypePrimitive.DOMIMP.rows.concat(['Labour Cost']),
//         matrix: oecdTypePrimitive.DOMIMP.matrix.concat([
//           oecdTypePrimitive.TTL.cols.map((oCol) => {
//             const COL = oecdInputs.VAL.cols.indexOf(oCol);
//             const labrValue = oecdInputs.VAL.matrix[row_LABR_VAL][COL] || 0;
//             // TODO: Add the minimum check from the other table
//             return Math.min(labrValue);
//           }),
//         ]),
//       },
//     };

//     const roundMatrix = (matrix) => {
//       return matrix.map((oRow) => {
//         return oRow.map((oCol) => {
//           return Math.round((oCol + Number.EPSILON) * 1e5) / 1e5;
//         });
//       });
//     };

//     const typeI = {
//       TOTAL: roundMatrix(leontief.closed(oecdTypeI.TTL.matrix)),
//       DOMESTIC: roundMatrix(leontief.closed(oecdTypeI.DOMIMP.matrix)),
//     };
//     const typeII = {
//       TOTAL: roundMatrix(leontief.closed(oecdTypeII.TTL.matrix)),
//       DOMESTIC: roundMatrix(leontief.closed(oecdTypeII.DOMIMP.matrix)),
//     };

//     // const newReportName = `reports/oecd_${
//     //   new Date().toISOString().split('T')[0]
//     // }_${crypto.randomUUID()}.json`;
//     // console.log(newReportName);
//     // userStorage.write(
//     //   newReportName,
//     //   { DR: oecdTypePrimitive, typeI, typeII }
//     // );
// >>>>>>> To Review
};
