import { ConnectDB } from "@/lib/config/db";
import { User } from "@/lib/models/User";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error("Veuillez remplir tous les champs");
        }

        try {
          await ConnectDB();
          const user = await User.findOne({ email }).select("+password +role");

          if (!user || !user.password) {
            throw new Error("Email ou mot de passe incorrect");
          }

          const isMatched = await compare(password, user.password);

          if (!isMatched) {
            throw new Error("Mot de passe incorrect");
          }

        const userData = {
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            role: user.role,
          id: user._id,
        };

        return userData;
      } catch (error) {
        throw new Error("Email ou mot de passe incorrect");
      }
    }
    }),],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role //as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async signIn({ user, account }) {
      console.log("Tentative de connexion avec:", account?.provider);

      if (account?.provider === "google") {
        try {
          const {email, name, image, id} = user;
          console.log("Données utilisateur Google:", { email, name });

          await ConnectDB();
          const existingUser = await User.findOne({ email });

          if (!existingUser) {
            console.log("Création d'un nouvel utilisateur Google");
            await User.create({
              email,
              name,
              image,
              authProviderId: id,
              role: "user", // Définir un rôle par défaut
            });
          } else {
            console.log("Mise à jour de l'utilisateur Google existant");
            await User.findOneAndUpdate(
              { email },
              { name, image, authProviderId: user.id }
            );
          }
          return true;
        } catch (error) {
          console.error("Erreur lors de la connexion Google:", error);
          return false;
        }
      }

      if (account?.provider === "credentials") {
        return true;
      }

      console.log("Provider non géré:", account?.provider);
      return false;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

  