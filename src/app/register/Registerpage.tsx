"use client";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState, useEffect } from "react";
import Input from "../Components/ui/Input";
import { register } from "../../actions/user";
import { useRouter } from 'next/navigation';
import { getSession } from "@/src/lib/config/getSession";

// Séparation de la logique asynchrone pour obtenir la session et rediriger
async function checkUserSession() {
    const session = await getSession();
    return session?.user;
}

const RegisterPage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        // Appel asynchrone pour vérifier la session utilisateur
        checkUserSession().then(user => {
            if (user) {
                router.push('/');
            } else {
                setUser(null); // On pourrait gérer un état spécifique pour indiquer que l'utilisateur n'est pas connecté
                console.error('Error fetching session:', error);
            }
        });
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(formData);
            console.log('Registration successful:', formData);
            router.push('/login');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="flex flex-col mb-4">
                            <Label htmlFor="firstname">Prénom</Label>
                            <Input 
                                id="firstname" 
                                placeholder="Entrez votre prénom" 
                                type="text" 
                                name="firstname" 
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col mb-4">
                            <Label htmlFor="lastname">Nom</Label>
                            <Input 
                                id="lastname" 
                                placeholder="Entrez votre nom" 
                                type="text" 
                                name="lastname" 
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email" 
                            placeholder="Entrez votre email" 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col mb-6">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input 
                            id="password" 
                            placeholder="****************" 
                            type="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Adhérer &arr;
                    </button>

                    <p className="mt-4">
                        Vous avez déjà un compte ? <Link href="/login" className="text-blue-500 hover:underline">Se connecter</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
