'use client'
import React, { FormEventHandler } from "react";
import { useAuthContext } from "../context/authcontext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import sendData from "../api/firebase/firestore/sendData";



export default function Page() {
    const user = useAuthContext()
    const router = useRouter()
    const [name, setName] = React.useState('')
    const [state, setState] = useState("IDLE");
    const [errorMessage, setErrorMessage] = useState('');

 


    function goToSignIn(){
        router.replace('/')
    }

    const handleForm = async (event: any) => {
        event.preventDefault()
        const data = name;

        const {result, error } = await sendData(data);
        

        if (error) {
            setErrorMessage(JSON.stringify(error));
            setState("ERROR");
            return console.log(error)

        }

        // else successful
        setState("SUCCESS");
        console.log(result)
        return;
    }

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [router, user])

    return (
<div className="min-h-screen max-h-screen bg-white">
    <div className="flex flex-col items-center ">
    <div className="relative h-20 w-48 mt-20">            <Image src="/css.png" alt='Cary Chinese School' fill sizes='100vw' className="object-cover"></Image></div>
            <h1 className="text-amber-600 font-bold text-md">Summer Pickup</h1>
            {/*<h1 className="text-amber-600 font-bold text-3xl mt-4">Sign in to enter name</h1>*/}
            <p className="text-purple-700 text-[16px] mt-10">Enter name of child for pickup</p>

    <form onSubmit={handleForm} className="flex flex-col items-start justify-start space-y-4 mt-4">
                <label htmlFor="name">

                    <input className='border-2 py-1 px-2 min-w-[256px]'onChange={(e) => setName(e.target.value)} required type="name" name="name" id="name" placeholder="Matthew Guo/郭子玉" />
                </label>
                <button type="submit"><div className=" border-2 text-white font-bold text-lg border-purple-200 px-2 py-1.5 w-[256px] rounded-lg bg-purple-400">Submit</div></button>
<div  className='w-48'></div>
<button  className="w-[256px] mt-[-10px] text-right text-[14px]" onClick={goToSignIn}><p>Back to login</p></button>

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
