<<<<<<< HEAD
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import RegisterPage from './Registerpage';
import { useEffect } from 'react';

export default function RegisterWrapper() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return; // Ne rien faire pendant le chargement
        if (session?.user) router.push('/'); // Rediriger si l'utilisateur est connecté
    }, [session, status, router]);

    return <RegisterPage />;
=======
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import RegisterPage from './Registerpage';
import { useEffect } from 'react';

export default function RegisterWrapper() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return; // Ne rien faire pendant le chargement
        if (session?.user) router.push('/'); // Rediriger si l'utilisateur est connecté
    }, [session, status, router]);

    return <RegisterPage />;
>>>>>>> 4448097 (ajout name sur list Articles, Lettrine article + box name)
}