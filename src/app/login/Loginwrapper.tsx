import { getSession } from "@/lib/config/getSession";
import { redirect } from 'next/navigation';
import RegisterPage from './Loginpage'; // Assurez-vous que le chemin d'importation est correct

export default async function RegisterWrapper() {
    const session = await getSession();
    const user = session?.user;
    if (user) redirect('/');

    return <RegisterPage />;
}