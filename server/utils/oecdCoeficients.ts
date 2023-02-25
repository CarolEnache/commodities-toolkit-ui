import { OECDRawInputOutput } from "./dataStorage";
import Matrix from "./mathjsMatrix";
// import leontief from "./leontief";
import { OECD_UNUSED_SECTOR_TO, OECD_UNUSED_SECTOR_FROM } from "../constants";
import { REGIONS } from "./auxiliary";
import { CellValue, Row, Table, } from "./types";

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
  Value,
}

enum OECDRawVariables {
  DOMESTIC = "DOMIMP", // Domestic output and imports
  TOTAL = "TTL",
  VALUE_ADDED = "VAL",
}

const filterByRegion = (selectedRegion: string) => (row: Row) => {
  // COL is not in unused cols
  if (OECD_UNUSED_SECTOR_TO.includes(`${row[OECDRawTitles.COL]}`)) {
    return false;
  }
  // ROWS is not in unused rows
  // if (OECD_UNUSED_SECTOR_FROM.includes(`${row[OECDRawTitles.ROW]}`)) {
  //   return false;
  // }
  // Filter by region if it's not Global
  if (selectedRegion && selectedRegion !== REGIONS.GLOBAL) {
    // And it's not the selected region
    if (row[OECDRawTitles.Region] !== selectedRegion) {
      return false;
    }
  }

  // Keep only the value added ? Review with spreadsheet
  // if (row[OECDRawTitles.VAR] === OECDRawVariables.VALUE_ADDED) {
  //   return true;
  // }

  return true;
};

const getOECDInputs = (OECDRawData: Table) => { // ✅ Approved by Carol
  const oecdInputs: Record<string, Matrix> = {};
  OECDRawData.forEach((row) => {
    let VAR = `${row[OECDRawTitles.VAR]}`;
    const ROW = `${row[OECDRawTitles.ROW]}`;
    if (VAR === OECDRawVariables.DOMESTIC && ROW === 'VALU') {
      VAR = OECDRawVariables.VALUE_ADDED; // Some Row have VAR==DOMESTIC, but their name is VALU, so they're actually VAL
    }
    const COL = `${row[OECDRawTitles.COL]}`;
    const POW = parseFloat(`${row[OECDRawTitles.PowerCodeCode]}`);
    const VAL = parseFloat(`${row[OECDRawTitles.Value]}`);

    if (!oecdInputs[VAR]) {
      oecdInputs[VAR] = new Matrix();
    }
    const output = oecdInputs[VAR];
    const rowIndex = output.getRow(ROW);
    const colIndex = output.getCol(COL);

    output.setValue(rowIndex, colIndex, (previousValue) => (Number(previousValue) + (Math.pow(10, POW) * VAL)));
  });
  // TODO: The oecdInputs sheet is also having calculations from OECDEmployment that haven't been implemented
  return oecdInputs;
};

export const oecdCoeficients = ({ selectedRegion = REGIONS.GLOBAL } = {}) => {
  const OECDRawData: Table = OECDRawInputOutput.slice(1) // Remove the sheet titles
    .filter(filterByRegion(selectedRegion));

  const oecdInputs = getOECDInputs(OECDRawData);

  const oecdDirectRequirements: Record<string, Matrix> = {};
  Object.values(OECDRawVariables).forEach((VAR) => {
    if (!oecdDirectRequirements[VAR]) {
      oecdDirectRequirements[VAR] = new Matrix(); // CHANGED: Removed the starting value of oecdInputs
    }

    oecdInputs[VAR].cols.forEach((col) => {
      const totalValue = oecdInputs[OECDRawVariables.TOTAL].getValueByName('VALU', col);
      const totalOutput = oecdInputs[OECDRawVariables.TOTAL].getValueByName('OUTPUT', col);

      oecdInputs[VAR].rows.filter(rowName => {
        if (VAR !== OECDRawVariables.VALUE_ADDED && OECD_UNUSED_SECTOR_FROM.includes(rowName)) {
          return false; // We remove the unused rows here
        }

        if (VAR === OECDRawVariables.DOMESTIC && rowName.match(/^IMP_/)) {
          return false; // We remove the IMP in DOMIMP
        }

        return true;
      }).forEach((row) => { // CHANGED: Added filter for rows
        const previous = oecdInputs[VAR].getValueByName(row, col);
        if (VAR === OECDRawVariables.VALUE_ADDED && row === 'VALU') {
          oecdDirectRequirements[VAR].setValueByName(row, col, Math.min(Number(previous), Number(totalValue)) / Number(totalOutput)); // Querky totalValue
        } else {
          oecdDirectRequirements[VAR].setValueByName(row, col, Number(previous) / Number(totalOutput));
        }
      });

      // Direct requirements - coeficients table
      if (VAR === OECDRawVariables.VALUE_ADDED) {
        const TXS_INT_FNL = oecdInputs[OECDRawVariables.TOTAL].getValueByName('TXS_INT_FNL', col);
        const TXS_IMP_FNL = oecdInputs[OECDRawVariables.TOTAL].getValueByName('TXS_IMP_FNL', col);
        const TTL_INT_FNL = oecdInputs[OECDRawVariables.TOTAL].getValueByName('TTL_INT_FNL', col);
        const row92 = Number(TTL_INT_FNL) / Number(totalOutput);
        const row93 = oecdDirectRequirements[OECDRawVariables.DOMESTIC].getColAsArrayByName(col).reduce((sum, each) => Number(sum) + Number(each), 0);
        oecdDirectRequirements[VAR].setValueByName('TXS_INT_FNL', col, (Number(TXS_INT_FNL) + Number(TXS_IMP_FNL)) / Number(totalOutput));
        oecdDirectRequirements[VAR].setValueByName('TTL_INT_FNL', col, row92);
        oecdDirectRequirements[VAR].setValueByName('Domestic intermediates', col, row93);
        oecdDirectRequirements[VAR].setValueByName('Imported intermediates', col, row92 - Number(row93));
        oecdDirectRequirements[VAR].setValueByName('Employees', col, 0); // TODO: To really calculate them
      }
    });
  });

  return {
    TOTrows: oecdDirectRequirements[OECDRawVariables.TOTAL].rows.length,
    DOMrows: oecdDirectRequirements[OECDRawVariables.DOMESTIC].rows.length,
    'Domestic intermediates': {
      D01T03: [oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('Domestic intermediates', 'D01T03'),   0.4177632 ],
      D07T08: [oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('Domestic intermediates', 'D07T08'),   0.4545871  ],
      D13T15: [oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('Domestic intermediates', 'D13T15'),   0.6058234 ],
    },
    VALUE_ADDED: {
      D01T03: {
        'TXS_INT_FNL': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('TXS_INT_FNL', 'D01T03'),
        'TTL_INT_FNL': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('TTL_INT_FNL', 'D01T03'),
        'Domestic intermediates': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('Domestic intermediates', 'D01T03'),
        'Imported intermediates': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('Imported intermediates', 'D01T03'),
        'Value added': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('VALU', 'D01T03'),
        'Taxes on production': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('OTXS', 'D01T03'),
        'Labour cost': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('LABR', 'D01T03'),
        'Operating surplus, gross': oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('GOPS', 'D01T03'),
      },
    },
    D01T03: {
      DOM_01T03: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_01T03', 'D01T03'), 0.15281070],
      DOM_05T06: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_05T06', 'D01T03'), 0.00153314],
      DOM_07T08: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_07T08', 'D01T03'), 0.00063531],
      DOM_09: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_09', 'D01T03'), 0.00322329],
      DOM_10T12: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_10T12', 'D01T03'), 0.07258892],
      DOM_13T15: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_13T15', 'D01T03'), 0.00246866],
      DOM_16: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_16', 'D01T03'), 0.00111496],
      DOM_17T18: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_17T18', 'D01T03'), 0.00149865],
      DOM_19: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_19', 'D01T03'), 0.02013333],
      DOM_20T21: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_20T21', 'D01T03'), 0.02634719],
      DOM_22: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_22', 'D01T03'), 0.00273352],
      DOM_23: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_23', 'D01T03'), 0.00149588],
      DOM_24: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_24', 'D01T03'), 0.00075564],
      DOM_25: [oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_25', 'D01T03'), 0.00265580],
    }
  };

  return oecdDirectRequirements;


  // VALU: Value added at basic prices
  // GOPS: Gross operating surplus and mixed income
  // LABR: Compensation of employees
  // OTXS: Other taxes less subsidies on production
  return [
    oecdDirectRequirements[OECDRawVariables.TOTAL].getValueByName('TTL_01T03','D01T03'), // ok
    oecdDirectRequirements[OECDRawVariables.DOMESTIC].getValueByName('DOM_01T03','D01T03'), // ok
    
    oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('VALU','D01T03'),
    oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('GOPS','D01T03'),
    oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('LABR','D01T03'),
    oecdDirectRequirements[OECDRawVariables.VALUE_ADDED].getValueByName('OTXS','D01T03'), // ok
  ];

  // <<<<<<< Reviewing
  // =======


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
