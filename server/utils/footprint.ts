import { oecdCoeficients } from './oecdCoeficients';

export const getOECDData = () => {
  const { footprint } = oecdCoeficients();
  return footprint
}
