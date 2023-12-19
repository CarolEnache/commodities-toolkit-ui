import type { NextApiRequest, NextApiResponse } from 'next'
import { getManufacturingSources } from '../../server/holistic-approach/query-handlers';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  getManufacturingSources(req, res);
}
