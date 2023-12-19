import type { NextApiRequest, NextApiResponse } from 'next'
import { handleIndustryMatrixSourceSelection } from '../../server/holistic-approach/query-handlers';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  handleIndustryMatrixSourceSelection(req, res);
}
