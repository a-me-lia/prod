"use client";
import "./globals.css";
import { AuthContextProvider } from "./context/authcontext";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import signIn from "./api/firebase/auth/signin";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const signInAuth = async () => {
    return await signIn();
  };

  signInAuth();
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <meta property="og:title" content="CCS Pickup App" />
        <meta
          property="description"
          content="The Cary Chinese School summer program pickup handler website"
        />
        <meta
          property="og:image"
          content="https://carycspickup.vercel.app/_next/image?url=%2Fcss.png&w=3840&q=75"
        />
        <meta property="og:url" content="https://carycspickup.vercel.app/" />
      </head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <title>CCS Summer Pickup</title>

      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
        <p className="absolute bottom-2 left-2 w-2/3 text-slate-900 text-[10px]">
          Developed by Matthew Guo <br />
        </p>
        <div className="absolute bottom-0 right-6 md:left-40 w-12 h-10"></div>
      </body>
    </html>
  );
}
