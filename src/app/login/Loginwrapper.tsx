
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Login from './Loginpage';
import { useEffect } from 'react';

export default function LoginWrapper() {
    const { data: session, status } = useSession();
    const router = useRouter();
    
    useEffect(() => {
        if (status === "authenticated") {
            router.push('/');
        }
    }, [status, router]);

    if (status === "loading") {
        return <div>Chargement...</div>;
    }
    
    if (status === "unauthenticated") {
        return <Login />;
    }
    
    return null;
}