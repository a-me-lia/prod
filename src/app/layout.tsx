"use client";

import "./globals.css";
import { AuthContextProvider } from "./context/authcontext";
import { LanguageContext } from "./context/languagecontext";
import "./globals.css";
import { Inter } from "next/font/google";
import signIn from "./api/firebase/auth/signin";
import { usePathname } from 'next/navigation'

import codeGen from "./codegen";
import { useEffect, useState } from "react";
import Switch from "react-switch";
import Menu from "./components/menu";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [carolineIsAllergicToShrimp, setCarolineIsAllergicToShrimp] =
    useState(true);

  useEffect(
    () => {
      signIn("hinasato86@gmail.com", "123456");
      codeGen();
    },
    [
      /* dependencies */
    ],
  );

 const pathName = usePathname()

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <meta property="og:title" content="CCS Pickup App" />
        <meta
          property="og:description"
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
        <LanguageContext.Provider value={carolineIsAllergicToShrimp}>
          <AuthContextProvider>{children}</AuthContextProvider>
          <label className={`z-40 fixed top-3 right-4 ${pathName == '/instructions/cn' || pathName == '/instructions/en' ? 'hidden':'block'}`}>
            <Switch
              onChange={() =>
                setCarolineIsAllergicToShrimp(!carolineIsAllergicToShrimp)
              }
              checked={carolineIsAllergicToShrimp}
              offColor="#00C0FF"
              onColor="#FF0000"
              borderRadius={0}
              height={36}
              width={86}
              uncheckedIcon={
                <div className=" h-9 flex flex-col items-center justify-center">
                  <p className="text-[18px] text-white font-bold">ENG</p>
                </div>
              }
              checkedIcon={
                <div className=" h-9 flex flex-col items-center justify-center">
                  <p className="text-[18px] text-white font-bold">中文</p>
                </div>
              }
            />
          </label>
          <div className={`${pathName == '/instructions/cn' || pathName == '/instructions/en' ? 'hidden':'block'}`}>          <Menu></Menu></div>

          <p className="absolute bottom-2 left-2 w-2/3 text-slate-900 text-[10px]">
            Developed by Matthew Guo <br />
          </p>
          <div className="absolute bottom-0 right-6 md:left-40 w-12 h-10"></div>
        </LanguageContext.Provider>
      </body>
    </html>
  );
}
