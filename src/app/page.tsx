"use client";
import React, { FormEventHandler } from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import sendData from "./api/firebase/rtdb/sendData";
import codeGen from "./codegen";

let prevName = "";

export default function Page() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  codeGen();

  function goToQr() {
    router.push("/qr");
  }
  function goToViewNames() {
    router.push("/names");
  }
  function goToSignIn() {
    router.push("/");
  }

  const handleForm = async (event: any) => {
    event.preventDefault();

    const data = name;
    if (code != String(codeGen())) {
      setState("ERROR");
      setErrorMessage("wrong code!");
      return;
    }

    if (name != prevName) {
      let { result, error, lastName } = await sendData(data);
      if (error) {
        setErrorMessage(JSON.stringify(error));
        setState("CODEEXCEPTION");
        return console.log(error);
      }
      // else successful
      setState("SUCCESS");
      //console.log(result)

      prevName = name;
      return;
    } else {
      setState("ERROR");
      setErrorMessage("Name " + name + " was already sent, please wait.");
      return;
    }
  };

  return (
    <div className="  h-[calc(100dvh)] xl:min-h-screen  overflow-hidden text-black bg-white">
      <div className="flex flex-col items-center ">
        <div className="absolute top-6 right-6" onClick={goToViewNames}>
          <button className="relative h-8 w-24">
            <Image src="/live.webp" alt="live" sizes="100vw" fill></Image>
          </button>
          <p className="text-center">pickup list</p>
        </div>
        <div className="absolute top-6 left-6" onClick={goToQr}>
          <button className="relative xl:h-24 h-8 w-24">
            <div className="absolute top-[-2px] xl:hidden left-6 z-50 text-red-500 font-bold text-3xl">
              QR
            </div>
            <Image
              src="/qr.png"
              alt="qr"
              sizes="100vw"
              fill
              className="object-cover"
            ></Image>
          </button>
          <p className="text-center">QR Code</p>
        </div>
        <div className="relative h-20 w-48 mt-24">
          {" "}
          <Image
            src="/css.png"
            alt="Cary Chinese School"
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover"
          ></Image>
        </div>
        <h1 className="text-amber-600 font-bold text-md">Summer Pickup</h1>
        {/*<h1 className="text-amber-600 font-bold text-3xl mt-4">Sign in to enter name</h1>*/}
        <p className="text-purple-700 text-[16px] mt-10">
          Enter name of child for pickup
        </p>

        <form
          onSubmit={handleForm}
          className="flex flex-col items-start justify-start space-y-3 mt-4"
        >
          <label className="relative" htmlFor="name">
            <div className="absolute bg-white p-[0.5] text-[10px] text-slate-500 translate-x-2 -translate-y-2">
              Name (English Preferred)
            </div>
            <input
              className="border-2 rounded-lg py-1 px-2 min-w-[256px]"
              onChange={(e) => setName(e.target.value)}
              required
              type="name"
              name="name"
              id="name"
              placeholder="Matthew Guo/郭子玉"
            />
          </label>

          <div className="flex flex-row space-x-4 items-center">
            {" "}
            <label className="relative" htmlFor="code">
              <div className="absolute bg-white p-[0.5] text-[10px] text-slate-500 translate-x-2 -translate-y-2">
                Code
              </div>
              <input
                className="border-2 rounded-lg py-1 px-2 w-[48px]"
                onChange={(e) => setCode(e.target.value)}
                required
                type="code"
                name="code"
                id="code"
                placeholder="XX"
              />
            </label>
            <button type="submit">
              <div className=" border-2 text-white font-bold text-lg border-purple-200 px-2 py-1 w-[192px] rounded-lg bg-purple-400 drop-shadow-xl hover:bg-slate-300 hover:drop-shadow-none transition-all duration-200">
                Submit
              </div>
            </button>
          </div>

          {state === "CODEEXCEPTION" && (
            <p className="relative  mt-[-10px] text-red-600">{errorMessage}</p>
          )}
        </form>

        <div className="p-4 w-72 break-words">
          {state === "ERROR" && (
            <p className="relative  mt-2 text-red-600">{errorMessage}</p>
          )}
          {state === "SUCCESS" && (
            <p className="relative  mt-2 text-green-600">Success!</p>
          )}
        </div>
      </div>
    </div>
  );
}
