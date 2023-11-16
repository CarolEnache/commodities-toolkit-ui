// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import { oecdCoeficients } from '../../server/utils/oecdCoeficients';
import { unido } from '../../server/utils/unido';
// import { msr } from '../../server/utils/msr'
// import { getOECDData } from '../../server/utils/footprint';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json(msr());
  // res.status(200).json(unido());
  // res.status(200).json(oecdCoeficients());
  res.status(200).json(unido());
}
