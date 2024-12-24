import type { Metadata } from "next";
import "./globals.css";
import Providers from "../app/providers";
import ClientLayout from "../components/ClientLayout";


export const metadata: Metadata = {
  title: "PayMe Merchant",
  description: "Merchant Dashboard",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className="bg-slate-50">
          <ClientLayout>
            {children}
          </ClientLayout>
        </body>
      </Providers>
    </html>
  );
}
