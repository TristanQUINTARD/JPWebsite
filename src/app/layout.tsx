import { ClientProvider } from "../lib/config/ClientProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider session={null}>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}