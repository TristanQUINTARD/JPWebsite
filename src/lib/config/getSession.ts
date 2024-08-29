import { getToken } from "next-auth/jwt";

export async function getSession(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET as string, salt: process.env.NEXTAUTH_SALT as string });
  return token ? { user: token } : null;
}