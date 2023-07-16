'use client'
import React, { FormEventHandler } from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import sendData from "../api/firebase/rtdb/sendData";
import Link from "next/link";
import sendCode from "../api/firebase/rtdb/sendCode";



export default function Page() {
    const router = useRouter()
    const [name, setName] = React.useState('')
    const [code, setCode] = React.useState('')
    const [state, setState] = useState("IDLE");
    const [errorMessage, setErrorMessage] = useState('');

    let date = new Date().toUTCString().slice(0, 16);
    function TSH(s:string){for(var i=0,h=9;i<s.length;)h=Math.imul(h^s.charCodeAt(i++),9**9);return h^h>>>9}

    const codeRef = TSH(date) % 100

    sendCode(codeRef);

    

    function goToViewNames(){
        router.replace('/names')
    }
    function goToSignIn(){
        router.replace('/')
    }

    const handleForm = async (event: any) => {
        event.preventDefault()
        const data = name;
        if (code != String(codeRef)){
            setState("ERROR")
            setErrorMessage("wrong code!")
            return;
        }


        const {result, error } = await sendData(data);
        

        if (error) {
            setErrorMessage(JSON.stringify(error));
            setState("CODEEXCEPTION");
            return console.log(error)

        }

        // else successful
        setState("SUCCESS");
        console.log(result)
        return;
    }


    return (
        
        
<div className="  h-screen overflow-hidden text-black bg-white">
    <div className="flex flex-col items-center ">
        <div className="absolute top-6 right-6" onClick={goToViewNames}><button  className="relative h-8 w-24" ><Image src='/live.webp' alt="live" sizes="100vw" fill></Image></button>
        <p className="text-center">pickup list</p></div>
    <div className="relative h-20 w-48 mt-24">            <Image src="/css.png" alt='Cary Chinese School' fill sizes='100vw' loading="lazy" className="object-cover"></Image></div>
            <h1 className="text-amber-600 font-bold text-md">Summer Pickup</h1>
            {/*<h1 className="text-amber-600 font-bold text-3xl mt-4">Sign in to enter name</h1>*/}
            <p className="text-purple-700 text-[16px] mt-10">Enter name of child for pickup</p>

    <form onSubmit={handleForm} className="flex flex-col items-start justify-start space-y-4 mt-4">
                <label htmlFor="name">

                    <input className='border-2 py-1 px-2 min-w-[256px]'onChange={(e) => setName(e.target.value)} required type="name" name="name" id="name" placeholder="Matthew Guo/郭子玉" />
                </label>
                
<div className='flex flex-row space-x-4 items-center'>                <label htmlFor="code">

<input className='border-2 py-1 px-2 w-[64px]'onChange={(e) => setCode(e.target.value)} required type="code" name="code" id="code" placeholder="Code" />
</label>
                <button type="submit"><div className=" border-2 text-white font-bold text-lg border-purple-200 px-2 py-1 w-[176px] rounded-lg bg-purple-400">Submit</div>
                </button></div>


<button  className="w-[256px] mt-[-10px] text-right text-[14px]" onClick={goToSignIn}><p>Back to login</p></button>
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
      )}</div>
    </div>

    
</div>


    );
}
