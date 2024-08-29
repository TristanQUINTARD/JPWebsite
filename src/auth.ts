import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectDB } from "./lib/config/db";
import { User } from "./lib/models/User";
import { compare } from "bcryptjs";

// Fonction de logging simple compatible Edge
const log = (level: "info" | "warn" | "error", message: string, meta = {}) => {
  console[level](`[${level.toUpperCase()}] ${message}`, meta);
};

// Classes d'erreur personnalisées
class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new ValidationError("Veuillez remplir tous les champs");
        }

        try {
          await ConnectDB();
          const user = await User.findOne({ email }).select("+password +role");

          if (!user || !user.password) {
            throw new AuthError("Email ou mot de passe incorrect");
          }

          const isMatched = await compare(password, user.password);

          if (!isMatched) {
            throw new AuthError("Mot de passe incorrect");
          }

          return {
            id: user._id.toString(),
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          log("error", "Erreur lors de l'authentification", { error: error.message });
          if (error instanceof AuthError || error instanceof ValidationError) {
            throw error;
          }
          throw new DatabaseError("Une erreur est survenue lors de l'authentification");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      if (token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt" as const }, // Ajout de 'as const' pour le type
  secret: process.env.NEXTAUTH_SECRET,
};



// Gestion des erreurs côté client
export const handleAuthError = (error: Error) => {
  if (error instanceof AuthError) {
    return { message: error.message, type: 'auth' };
  } else if (error instanceof DatabaseError) {
    return { message: "Erreur de base de données. Veuillez réessayer plus tard.", type: 'database' };
  } else if (error instanceof ValidationError) {
    return { message: error.message, type: 'validation' };
  } else {
    return { message: "Une erreur inattendue s'est produite. Veuillez réessayer.", type: 'unknown' };
  }
};



// Exportation de la configuration NextAuth
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);