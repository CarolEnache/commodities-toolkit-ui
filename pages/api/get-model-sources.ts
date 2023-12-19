import type { NextApiRequest, NextApiResponse } from 'next'
import { getModelSources } from '../../server/holistic-approach/query-handlers';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  getModelSources(req, res);
}
