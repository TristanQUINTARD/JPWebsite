"use client";
import React, { useState } from 'react';
import { Label } from "@radix-ui/react-label";
import Input from "../Components/ui/Input";
import { Button } from "../Components/ui/Button";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

// Définir des types d'erreur spécifiques
type AuthError = 'INVALID_CREDENTIALS' | 'NETWORK_ERROR' | 'UNKNOWN_ERROR';

type LoginProps = {
  initialSession: any; // Remplacez 'any' par le type approprié pour votre session
};

const Login = ({ initialSession }: LoginProps) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState<AuthError | null>(null);
    const router = useRouter();

    React.useEffect(() => {
        if (initialSession) {
            console.log("Utilisateur déjà connecté, redirection...");
            router.push('/');
        }
    }, [initialSession, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const logAuthAttempt = (email: string, success: boolean, errorType?: AuthError) => {
        console.log(`Tentative de connexion pour ${email}: ${success ? 'Réussie' : 'Échouée'}${errorType ? `, Erreur: ${errorType}` : ''}`);
        // Ici, vous pourriez envoyer ces logs à un service de logging externe
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
          });
      
          if (result?.error) {
            setError('INVALID_CREDENTIALS');
            logAuthAttempt(formData.email, false, 'INVALID_CREDENTIALS');
          } else {
            logAuthAttempt(formData.email, true);
            router.push('/dashboard');
          }
        } catch (error) {
          console.error(error);
          setError('NETWORK_ERROR');
          logAuthAttempt(formData.email, false, 'NETWORK_ERROR');
        }
      };

    const handleGoogleSignIn = async () => {
        try {
            await signIn("google", {
                callbackUrl: "/dashboard",
            });
        } catch (error) {
            console.error(error);
            setError('NETWORK_ERROR');
            logAuthAttempt('Google Sign-In', false, 'NETWORK_ERROR');
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {error && <p className="text-red-500 mb-4">
                    {error === 'INVALID_CREDENTIALS' && "Identifiants invalides."}
                    {error === 'NETWORK_ERROR' && "Erreur de réseau. Veuillez réessayer."}
                    {error === 'UNKNOWN_ERROR' && "Une erreur inconnue s'est produite."}
                </p>}
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
}

export default Login;