import type { NextApiRequest, NextApiResponse } from 'next'
import { uploadIndustryMetricSource } from '../../server/holistic-approach/query-handlers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await uploadIndustryMetricSource(req, res);
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
