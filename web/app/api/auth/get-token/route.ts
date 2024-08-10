import { getToken } from '@/app/lib/dal';

export async function GET() {
  const token = await getToken();

  if (!token) {
    return Response.json(null);
  }

  return Response.json({ token });
}
