import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import AppbarClient from "../components/AppbarClient";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "PayMe",
  description: "Wallet for your daily needs",
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
      <body className={`${geistSans.variable} ${geistMono.variable} bg-slate-50`}>
        <AppbarClient />
          {children}
        <Toaster position="top-right" />
      </body>
      </Providers>
    </html>
  );
}
