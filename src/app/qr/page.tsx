"use client";
import Image from "next/image";
import Link from "next/link";
import codeGen from "../codegen";
import { useState, useEffect } from "react";
import signIn from "../api/firebase/auth/signin";

export default function Page() {
  const [code, setCode] = useState(0);

  useEffect(
    () => {
      setCode(codeGen());
    },
    [
      /* dependencies */
    ],
  );

  signIn("hinasato86@gmail.com", "123456");

  return (
    <div className=" h-[calc(100dvh)] xl:min-h-screen flex flex-col items-center bg-white">

      <div></div>
      <div className="absolute z-50 top-[64px] xl:top-[-24px] text-9xl  xl:text-[320px] text-red-500 font-bold">
        {code.toString()}
      </div>
      <div className="h-32"></div>
      <div className="relative mt-8 w-full xl:w-min xl:h-screen xl:aspect-square aspect-square ">
        <Image
          src="/qr.png"
          fill
          alt="qr code for https://carycspickup.vercel.app"
          className="aspect-square object-cover"
        />
      </div>

      <div className="absolute bottom-0 w-full">
        <div className="absolute bottom-0 translate-x-1/2">
          <div className="relative h-72 w-48"></div>
        </div>
      </div>
    </div>
  );
}
