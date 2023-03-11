import { OECDRawInputOutput } from './dataStorage';
import Matrix from './mathjsMatrix';
import { closed as leontief } from './leontief';
import { OECD_UNUSED_SECTOR_TO, OECD_UNUSED_SECTOR_FROM } from '../constants';
import { REGIONS } from './auxiliary';
import {
  OECDRawTitles,
  OECDRawVariables,
  CellValue,
  Row,
  Table,
  OECDVariableSheet,
} from './types';

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

const getOECDInputs = (OECDRawData: Table) => {
  // ✅ Approved by Carol
  const oecdInputs: OECDVariableSheet = {};
  OECDRawData.forEach((row) => {
    let VAR = `${row[OECDRawTitles.VAR]}` as OECDRawVariables;
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
    const output = oecdInputs[VAR] as Matrix; // Developers say: It's always defined Typescript :joy:

    output.setValueByName(
      ROW,
      COL,
      (previousValue) => Number(previousValue) + Math.pow(10, POW) * VAL
    );
  });
  // TODO: The oecdInputs sheet is also having calculations from OECDEmployment that haven't been implemented
  return { oecdInputs };
};

// JUST NOW: git stash && git pull && git stash pop
const getOECDDirectRequirements = (oecdInputs: OECDVariableSheet) => {
  const oecdDirectRequirements: OECDVariableSheet = {};
  /**
   * This is a matrix with just the industry rows and columns, to be able to calculate the types
   */
  const oecdTypePrimitive: OECDVariableSheet = {};

  Object.values(OECDRawVariables).forEach((VAR) => {
    if (!oecdDirectRequirements[VAR]) {
      oecdDirectRequirements[VAR] = new Matrix(); // CHANGED: Removed the starting value of oecdInputs
      if (VAR !== OECDRawVariables.VALUE_ADDED) {
        // ADDED: Started with the matrix for the next step
        oecdTypePrimitive[VAR] = new Matrix();
      }
    }

    oecdInputs[VAR]?.cols.forEach((col) => {
      const totalValue = oecdInputs[OECDRawVariables.TOTAL]?.getValueByName(
        'VALU',
        col
      );
      let totalOutput: number = 0;
      if (col === 'HFCE') {
        /**
         * TODO: This comes OECD Income using the "last year" (hardcoded to 2019 in the sheet)
         */
        totalOutput = 32889721200329.3;
      } else {
        totalOutput = Number(
          oecdInputs[OECDRawVariables.TOTAL]?.getValueByName('OUTPUT', col)
        );
      }

      oecdInputs[VAR]?.rows
        .filter((rowName) => {
          if (
            VAR !== OECDRawVariables.VALUE_ADDED &&
            OECD_UNUSED_SECTOR_FROM.includes(rowName)
          ) {
            return false; // We remove the unused rows here
          }

          if (VAR === OECDRawVariables.DOMESTIC && rowName.match(/^IMP_/)) {
            return false; // We remove the IMP in DOMIMP
          }

          return true;
        })
        .forEach((row) => {
          // CHANGED: Added filter for rows
          const previous = oecdInputs[VAR]?.getValueByName(row, col);
          let value;
          if (VAR === OECDRawVariables.VALUE_ADDED && row === 'VALU') {
            value =
              Math.min(Number(previous), Number(totalValue)) / totalOutput; // Querky totalValue
          } else {
            value = Number(previous) / totalOutput;
          }
          oecdDirectRequirements[VAR]?.setValueByName(row, col, value);

          if (VAR !== OECDRawVariables.VALUE_ADDED) {
            // DOUBT: Any extra filtering?
            oecdTypePrimitive[VAR]?.setValueByName(row, col, value);
          }
        });

      // Direct requirements - coeficients table
      if (VAR === OECDRawVariables.VALUE_ADDED) {
        const TXS_INT_FNL = oecdInputs[OECDRawVariables.TOTAL]?.getValueByName(
          'TXS_INT_FNL',
          col
        );
        const TXS_IMP_FNL = oecdInputs[OECDRawVariables.TOTAL]?.getValueByName(
          'TXS_IMP_FNL',
          col
        );
        const TTL_INT_FNL = oecdInputs[OECDRawVariables.TOTAL]?.getValueByName(
          'TTL_INT_FNL',
          col
        );
        const row92 = Number(TTL_INT_FNL) / Number(totalOutput);
        const row93 = oecdDirectRequirements[OECDRawVariables.DOMESTIC]
          ?.getColAsArrayByName(col)
          .reduce((sum, each) => Number(sum) + Number(each), 0);
        oecdDirectRequirements[VAR]?.setValueByName(
          'TXS_INT_FNL',
          col,
          (Number(TXS_INT_FNL) + Number(TXS_IMP_FNL)) / Number(totalOutput)
        );
        oecdDirectRequirements[VAR]?.setValueByName('TTL_INT_FNL', col, row92);
        oecdDirectRequirements[VAR]?.setValueByName(
          'Domestic intermediates',
          col,
          row93 || 0
        );
        oecdDirectRequirements[VAR]?.setValueByName(
          'Imported intermediates',
          col,
          row92 - Number(row93)
        );
        oecdDirectRequirements[VAR]?.setValueByName('Employees', col, 0); // TODO: To really calculate them
      }
    });
  });

  return { oecdDirectRequirements, oecdTypePrimitive };
};

const getOECDTypes = (
  oecdTypePrimitive: OECDVariableSheet,
  oecdDirectRequirements: OECDVariableSheet
) => {
  const oecdTypeI = {
    TTL: new Matrix(oecdTypePrimitive.TTL),
    DOMIMP: new Matrix(oecdTypePrimitive.DOMIMP),
  };

  oecdTypeI.TTL.removeCol('HFCE');
  oecdTypeI.DOMIMP.removeCol('HFCE');

  const oecdTypeII = {
    TTL: new Matrix(oecdTypePrimitive.TTL),
    DOMIMP: new Matrix(oecdTypePrimitive.DOMIMP),
  };

  const laborVal = oecdTypeII.TTL?.cols.map((colName) => {
    const labrValue =
      (oecdDirectRequirements.VAL?.getValueByName('LABR', colName) as number) || 0;
    // TODO: Add the minimum check from the other table
    return Math.min(labrValue);
  });
  oecdTypeII.TTL.setRow('Labour Cost', laborVal);
  oecdTypeII.DOMIMP.setRow('Labour Cost', laborVal);

  return {
    oecdTypeI: {
      TOTAL: new Matrix({
        cols: oecdTypeI.TTL?.cols,
        rows: oecdTypeI.TTL?.rows,
        matrix: leontief(oecdTypeI.TTL?.matrix as number[][]),
      } as Matrix),
      DOMESTIC: new Matrix({
        cols: oecdTypeI.TTL?.cols,
        rows: oecdTypeI.TTL?.rows,
        matrix: leontief(oecdTypeI.DOMIMP?.matrix as number[][]),
      } as Matrix),
    },
    // oecdTypeII,
    oecdTypeII: {
      TOTAL: new Matrix({
        cols: oecdTypeII.TTL?.cols,
        rows: oecdTypeII.TTL?.rows,
        matrix: leontief(oecdTypeII.TTL?.matrix as number[][]),
      } as Matrix),
      DOMESTIC: new Matrix({
        cols: oecdTypeII.TTL?.cols,
        rows: oecdTypeII.TTL?.rows,
        matrix: leontief(oecdTypeII.DOMIMP?.matrix as number[][]),
      } as Matrix),
    },
  };
};

export const oecdCoeficients = ({ selectedRegion = REGIONS.GLOBAL } = {}) => {
  const OECDRawData: Table = OECDRawInputOutput.slice(1) // Remove the sheet titles
    .filter(filterByRegion(selectedRegion));

  const { oecdInputs } = getOECDInputs(OECDRawData);
  const { oecdDirectRequirements, oecdTypePrimitive } =
    getOECDDirectRequirements(oecdInputs);
  const { oecdTypeI, oecdTypeII } = getOECDTypes(oecdTypePrimitive, oecdDirectRequirements);

  return {
    DirectRequirements: oecdDirectRequirements,
    typeI: oecdTypeI,
    /**
     * BUG: Type II is not returning the same value as the spreadsheet
     * There's HFCE being incorrect in the sheet, but even changing that keeps wrong
     * direct requirements is correct, something changes in between
     */
    typeII: oecdTypeII,
  };
};
