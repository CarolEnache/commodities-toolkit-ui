import type { NextApiRequest, NextApiResponse } from 'next'
import { getIndustryMetricSources } from '../../server/holistic-approach/query-handlers';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  getIndustryMetricSources(req, res);
}
