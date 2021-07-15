import { NextApiRequest, NextApiResponse } from 'next';
import { SiteClient } from 'datocms-client';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const client = new SiteClient(process.env.DATO_CMS_FULL_ACCESS_TOKEN);

    const newRegister = await client.items.create({
      itemType: '967588', // Model ID dentro do "Models" do Dato CMS
      ...req.body,
    });

    res.status(200).json({ register: newRegister });

    return;
  }

  res.status(404).json({ message: 'The only method allow is POST' });
}
