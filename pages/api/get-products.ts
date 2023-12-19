import type { NextApiRequest, NextApiResponse } from 'next'
import { handleManufacturingSourceSelection } from '../../server/holistic-approach/query-handlers';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  handleManufacturingSourceSelection(req, res);
}
