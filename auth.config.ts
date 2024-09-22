
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { ConnectDB } from "@/lib/config/db"
import { User } from "@/lib/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Vérification des variables d'environnement
if (!process.env.JWT_SECRET) {
  throw new Error("La variable d'environnement JWT_SECRET n'est pas définie.");
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("La variable d'environnement NEXTAUTH_SECRET n'est pas définie.");
}

const secret = process.env.JWT_SECRET;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

export const authConfig: NextAuthConfig = {
  secret: nextAuthSecret,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    }
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await ConnectDB()
        const { email, password } = credentials;

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
          throw new Error("Identifiants invalides")
        }

        const isPasswordMatched = await bcrypt.compare(password as string, user.password as string)

        if (!isPasswordMatched) {
          throw new Error("Identifiants invalides")
        }

        const token = jwt.sign(
          { id: user._id, email: user.email },
          secret, // Assuré d'être une chaîne
          { expiresIn: '1d' }
        );

        return {
          id: user._id,
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
          lastname: user.lastname,
          firstname: user.firstname,
          token: token,
        }
      },
    }),
  ],
}
