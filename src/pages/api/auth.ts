import { NextApiRequest, NextApiResponse } from 'next';
import decode from 'jwt-decode';

export default async function githubAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;

  const tokenDecoded = decode<{ githubUser: string }>(authorization);

  if (!tokenDecoded) {
    return res.send({
      isAuthenticated: false,
    });
  }

  const response = await fetch(
    `https://api.github.com/users/${tokenDecoded.githubUser}`
  );
  const data = await response.json();

  if (data.message === 'Not Found' || !data) {
    res.send({
      isAuthenticated: false,
    });
  } else {
    res.send({
      isAuthenticated: true,
    });
  }
}
