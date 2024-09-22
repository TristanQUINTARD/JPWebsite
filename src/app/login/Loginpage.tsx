
"use client";
import React, { useState } from 'react';
import { Label } from "@radix-ui/react-label";
import Input from "../Components/ui/Input";
import { Button } from "../Components/ui/Button";
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
                callbackUrl: '/'
            });
            if (result?.error) {
                setError(result.error);
            } else if (result?.ok) {
                router.push(result.url || '/');
            }
        } catch (error) {
            setError("Une erreur s'est produite lors de la connexion.");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signIn("google", {
                redirect: true,
                callbackUrl: "/",
            });
            // La redirection est gérée automatiquement
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