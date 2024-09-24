
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./Components/auth/NavBar"; 
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <title>Votre Application</title>
        {/* Autres balises head */}
      </head>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
