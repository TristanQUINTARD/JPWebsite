<<<<<<< HEAD
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
=======
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
>>>>>>> 4448097 (ajout name sur list Articles, Lettrine article + box name)
} = NextAuth(authConfig);