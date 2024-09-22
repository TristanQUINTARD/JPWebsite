<<<<<<< HEAD
"use client";
import React, { useState } from 'react';
import { Label } from "@radix-ui/react-label";
import Input from "../Components/ui/Input";
import { Button } from "../Components/ui/Button";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from "../../actions/user";

const RegisterPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
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
            await register(formData);
            router.push('/login');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Une erreur s'est produite lors de l'inscription.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Inscription</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className='my-8 space-y-4' onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="firstname">Prénom</Label>
                        <Input 
                            id="firstname" 
                            placeholder="John" 
                            type="text" 
                            name="firstname" 
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastname">Nom</Label>
                        <Input 
                            id="lastname" 
                            placeholder="Doe" 
                            type="text" 
                            name="lastname" 
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Adresse email</Label>
                        <Input 
                            id="email" 
                            placeholder="john.doe@example.com" 
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
                        S'inscrire
                    </Button>
                </form>
                <p className="mt-4 text-center">
                    Vous avez déjà un compte ? <Link href="/login" className="text-blue-500 hover:underline">Se connecter</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
=======
"use client";
import React, { useState } from 'react';
import { Label } from "@radix-ui/react-label";
import Input from "../Components/ui/Input";
import { Button } from "../Components/ui/Button";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from "../../actions/user";

const RegisterPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
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
            await register(formData);
            router.push('/login');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Une erreur s'est produite lors de l'inscription.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Inscription</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className='my-8 space-y-4' onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="firstname">Prénom</Label>
                        <Input 
                            id="firstname" 
                            placeholder="John" 
                            type="text" 
                            name="firstname" 
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastname">Nom</Label>
                        <Input 
                            id="lastname" 
                            placeholder="Doe" 
                            type="text" 
                            name="lastname" 
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Adresse email</Label>
                        <Input 
                            id="email" 
                            placeholder="john.doe@example.com" 
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
                        S'inscrire
                    </Button>
                </form>
                <p className="mt-4 text-center">
                    Vous avez déjà un compte ? <Link href="/login" className="text-blue-500 hover:underline">Se connecter</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
>>>>>>> 4448097 (ajout name sur list Articles, Lettrine article + box name)
