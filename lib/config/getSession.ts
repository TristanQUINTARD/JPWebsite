import { auth } from "@/src/auth"
import getServerSession from "next-auth";
import { authConfig } from "@/auth.config";
import { getSession } from "next-auth/react";

export async function getSession() {
    if (typeof window === "undefined") {
        // Côté serveur
        return await getServerSession(authConfig);
    } else {
        // Côté client
        return await getSession();
    }
}
