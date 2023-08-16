"use client";
import React, { FormEventHandler } from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import signIn from "./api/firebase/auth/signin";
import Image from "next/image";
import sendData from "./api/firebase/rtdb/sendData";
import codeGen from "./codegen";
import Menu from "./components/menu";
import { useContext } from "react";
import { LanguageContext } from "./context/languagecontext";




let prevName = "";

export default function Page() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  let isEn = useContext(LanguageContext);

  codeGen();

  function goToQr() {
    router.push("/qr");
  }
  function goToViewNames() {
    router.push("/names");
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
        <div className="relative h-20 w-48 mt-16">
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
        <h1 className="text-amber-600 font-bold text-md">{`${isEn ? 'Summer Pickup' : '夏令营接娃'}`}</h1>
        {/*<h1 className="text-amber-600 font-bold text-3xl mt-4">Sign in to enter name</h1>*/}
        <p className="text-purple-700 text-[16px] mt-10">
        {`${isEn ? 'Enter name(s) of child for pickup' : '请在以下输入孩子的名字和版上的密码'}`}
        </p>

        <form
          onSubmit={handleForm}
          className="flex flex-col items-start justify-start space-y-3 mt-4"
        >
          <label className="relative" htmlFor="name">
            <div className="absolute bg-white p-[0.5] text-[10px] text-slate-500 translate-x-2 -translate-y-2">
            {`${isEn ? 'Name（English Preferred)' : '名字 （最好英语姓名）'}`}
            </div>
            <input
              className="border-2 rounded-lg py-1 px-2 w-[256px]"
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
              {`${isEn ? 'code' : '密码'}`}
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
              {`${isEn ? ' Submit' : '提交'}`}
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
