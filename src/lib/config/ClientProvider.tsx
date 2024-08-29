"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type ClientProviderProps = {
  children: ReactNode;
  session: Session | null;
};

export function ClientProvider({ children, session }: ClientProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
