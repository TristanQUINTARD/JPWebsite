// lib/session.ts (ou tout autre fichier approprié)
import { auth } from "@/src/auth";

export async function getSession() {
    const session = await auth();
    return session;
}
