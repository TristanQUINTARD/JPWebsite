"use server"

import { ConnectDB } from "@/lib/config/db"
import { redirect } from "next/navigation"
import { User } from "@/lib/models/User"
import { hash } from "bcryptjs"
import { signIn } from "../auth"
import { CredentialsSignin } from "next-auth"


const login = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {

        await signIn("credentials", {
            
            redirect: false,
            callbackUrl: "/",
            email,
            password,

        })

    } catch (error) {

        const someError = error as CredentialsSignin
        return someError.cause
    }
    redirect('/')
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