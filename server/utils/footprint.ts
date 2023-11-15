import { oecdCoeficients } from './oecdCoeficients';

export const getOECDData = () => {
  const { footprint } = oecdCoeficients();
  return footprint
}

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