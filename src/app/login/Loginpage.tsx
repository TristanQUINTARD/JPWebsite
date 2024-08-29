"use client";
import React, { useState } from 'react';
import { Label } from "@radix-ui/react-label";
import Input from "../Components/ui/Input";
import { Button } from "../Components/ui/Button";
import Link from 'next/link';
import { login } from '@/src/actions/user';
import { signIn } from '@/src/auth';  // Importez signIn de votre fichier auth.ts
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/config/getSession';

const Login = async () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const session = await getSession();
    const user = session?.user;
    if (user) redirect('/');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formDataObj = new FormData(e.currentTarget);
            const result = await signIn(formDataObj);
            if (result) {
                setError(result.toString());
            }
        } catch (error) {
            setError("Une erreur s'est produite lors de la connexion.");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signIn("google", {
                redirect: false,
                callbackUrl: "/",
            });
            if (result?.error) {
                setError(result.error);
            } else {
                // Gérez la redirection ou la mise à jour de l'état ici
                // Par exemple, vous pouvez utiliser window.location.href = "/" pour rediriger
            }
        } catch (error) {
            setError("Une erreur s'est produite lors de la connexion avec Google.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className='my-8 space-y-4' onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Adresse email</Label>
                        <Input 
                            id="email" 
                            placeholder="keanu.reeves@gmail.com" 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input 
                            id="password" 
                            placeholder="**********" 
                            type="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full"
                    >
                        Se connecter &rarr;
                    </Button>
                </form>

                <p className="mt-4 text-center">
                    Vous n'avez pas de compte ? <Link href="/register" className="text-blue-500 hover:underline">S'enregistrer</Link>
                </p>

                <Button 
                    onClick={handleGoogleSignIn}  
                    className="w-full bg-red-500 hover:bg-red-600 mt-4"
                >
                    Se connecter avec Google
                </Button>
            </div>
        </div>
    );
};

export default Login;