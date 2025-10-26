import { auth } from "@/src/auth"
import getServerSession from "next-auth";
import { authConfig } from "@/auth.config";
import { useSession } from "next-auth/react";

export async function getServerSideSession() {
    if (typeof window === "undefined") {
        // Côté serveur
        return await getServerSession(authConfig);
    } else {
        // Côté client - utilise useSession hook si nécessaire
        // Pour l'instant on retourne auth() qui fonctionne des deux côtés
        return await auth();
    }
}
