// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      firstname: string;
      lastname: string;
      // Ajoutez d'autres propriétés si nécessaire
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    firstname: string;
    lastname: string;
    // Ajoutez d'autres propriétés si nécessaire
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    firstname: string;
    lastname: string;
    // Ajoutez d'autres propriétés si nécessaire
  }
}