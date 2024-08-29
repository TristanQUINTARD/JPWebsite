"use server"

import { ConnectDB } from "../lib/config/db"
import { redirect } from "next/navigation"
import { User } from "../lib/models/User"
import { hash } from "bcryptjs"
import { signIn } from "next-auth/react"
import { CredentialsSignin } from "next-auth"


const login = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            return { error: result.error };
        }

        return { success: true };
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        return { error: "Une erreur s'est produite lors de la connexion" };
    }
}





const register = async (formData: FormData | { firstname: string, lastname: string, email: string, password: string }) => {
    let firstname, lastname, email, password;

    if (formData instanceof FormData) {
        firstname = formData.get("firstname") as string;
        lastname = formData.get("lastname") as string;
        email = formData.get("email") as string;
        password = formData.get("password") as string;
    } else {
        ({ firstname, lastname, email, password } = formData);
    }

    if(!firstname || !lastname || !email || !password) {
        throw new Error("Veuillez remplir tous les champs")
    }

    await ConnectDB();

    // Verifie si l'email est déjà utilisé

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email déjà utilisé");
    }

    const hashedPassword = await hash(password, 12);

    // Crée l'utilisateur
    await User.create({ firstname, lastname, email, password: hashedPassword });
    console.log("User créé")

    redirect('/login')
}

export { register, login }