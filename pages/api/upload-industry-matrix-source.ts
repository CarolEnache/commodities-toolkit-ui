import type { NextApiRequest, NextApiResponse } from 'next'
import { uploadIndustryMatrixSource } from '../../server/holistic-approach/query-handlers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await uploadIndustryMatrixSource(req, res);
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
