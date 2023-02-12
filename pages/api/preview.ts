import type { NextApiResponse, NextApiRequest } from 'next';

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  res.setPreviewData({});
  res.writeHead(307, { Location: '/' });
  res.end();
}
