import { COBALT_HARDCODED_MODEL } from "../constants";
import { REGIONS } from "./auxiliary";
import { oecdCoeficients } from "./oecdCoeficients";
import { unido } from "./unido";

export const getOECDData = () => {
  const { footprint } = oecdCoeficients();
  return footprint;
};

interface UnidoObject {
  "Table Description": string;
  Region: string;
  ISIC: string;
  Year: number;
  Value: number;
}

const gapFillingKey = (current: UnidoObject) =>
  `${current["Table Description"]}-${current.Region}-${current.ISIC}`;

/*
TODO: This gap filling is quite dumb
We replicated the Excel and as an example:
original: [8866, 9116, 9526, 9598, 10102, 10506, 9832, 0, 0, 0, 0, 0, 0, 264, 267, 261]
filled: [8866, 9116, 9526, 9598, 10102, 10506, 9832, 9832, 9832, 9832, 9832, 9832, 9832, 264, 267, 261]
We can see that a trend between 9832 and 264 would be a better predictor than keeping the same value.
*/
const gapFilling = (unidoArray: UnidoObject[]) => {
  let lastKnownValue: Record<string, number> = {};

  return unidoArray.map((current) => {
    const key = gapFillingKey(current);

    if (current.Value === 0) {
      return {
        ...current,
        Value: lastKnownValue[key],
      };
    }
    lastKnownValue[key] = current.Value;

    return current;
  });
};

type getUnidoDataFn = (params: { selectedRegion: string }) => void;

export const getUnidoData: getUnidoDataFn = ({ selectedRegion }) => {
  const unidoData = unido();

  COBALT_HARDCODED_MODEL.reduce((acc, curr) => {
    // const ceva = {
    //   "Table Description": ,//0
    //   ISIC: ,//isic,
    //   Year: ,//isic,
    //   Value: ,//,
    // };

    unidoData.filter(
      (data) =>
        (selectedRegion === REGIONS.GLOBAL
          ? true
          : selectedRegion === data.Region) && data.ISIC === curr.ISIC
    );

    // if (selectedRegion === REGIONS.GLOBAL) {
    //   // we sum them
    // } else if () {
    //   // we filter
    // }

    //     unidoData.
    //     "Table
    // Region
    // Year
    // ISIC
    // Value
    //     acc += curr.ISIC * curr.weight
    //     // does it match year, region, etc...?
    //     acc += curr
  }, []);
};

// TODO: COBALT_HARDCODED_MODEL
/*

Take the "table UNIDO blah" which is our array
I4 = "Table Description" = Establishments
"ISIC" = "ISIC" = 2211
if GLOBAL {
  Sum the Regions
} else {
  "Region" == "Region"
}
if it can't be found return 0

.reduce((acc, curr) => {
  // does it match year, region, etc...?
  acc += curr
}, 0) * F33

*/
