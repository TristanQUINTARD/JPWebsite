import { getSession } from '@/src/lib/config/getSession';
import { redirect } from 'next/navigation';
import RegisterPage from './Registerpage';

export default async function RegisterWrapper({ req }) { // Ajoutez req ici
  const session = await getSession(req);
  const user = session?.user;
  if (user) redirect('/');

  return <RegisterPage />;
}