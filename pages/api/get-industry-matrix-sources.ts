import type { NextApiRequest, NextApiResponse } from 'next'
import { getIndustryMatrixSources } from '../../server/holistic-approach/query-handlers';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  getIndustryMatrixSources(req, res);
}
