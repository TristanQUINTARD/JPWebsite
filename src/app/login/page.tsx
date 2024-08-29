import { getSession } from '@/src/lib/config/getSession';
import Login from './Loginpage';
import { GetServerSidePropsContext } from 'next';

export default async function LoginPage({ req }: { req: GetServerSidePropsContext['req'] }) {
  const session = await getSession(req);
  return <Login initialSession={session} />;
}