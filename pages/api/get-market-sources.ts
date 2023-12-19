import type { NextApiRequest, NextApiResponse } from 'next'
import { getMarketSources } from '../../server/holistic-approach/query-handlers';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  getMarketSources(req, res);
}
