import { redirect } from '@/dropbox/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const code = req.query.code as string;

  const { access_token } = await redirect(code);

  res.redirect(`${process.env.NEXT_PUBLIC_MY_URI}/token/${access_token}`);
}