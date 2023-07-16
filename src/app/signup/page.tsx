'use client'
import React from "react";
import signUp from "../api/firebase/auth/signup";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const router = useRouter()

    const [state, setState] = useState("IDLE");
    const [errorMessage, setErrorMessage] = useState('');

    function goToSignIn(){
        router.replace('./')
    }

    const handleForm = async (event: any) => {
        event.preventDefault()
        if(password !== confirmPassword){
            setState("ERROR");
            setErrorMessage("Passwords don't match!")
            return;
        }

        const { result, error } = await signUp(email, password);


        if (error) {           
            setErrorMessage(JSON.stringify(error));
            setState("ERROR");
            return console.log(error)

        }

        // else successful
        setState("SUCCESS");
        console.log(result)
        return router.push("/entry")
    }
    return (    <div className="  h-screen overflow-hidden text-black bg-white">

    <div className="flex flex-col items-center z-50">
        <div className="relative h-20 w-48 mt-24">            <Image src="/css.png" alt='Cary Chinese School' fill sizes="100vw" loading="lazy" className="object-cover"></Image></div>
        <h1 className="text-amber-600 font-bold text-md">Summer Pickup</h1>
        <p className="text-red-700 text-[16px] mt-10">* Not CCS Official Account *</p>
        <form onSubmit={handleForm} className="flex flex-col items-start justify-start space-y-4 mt-4">
            <label htmlFor="email">

                <input className='border-2 py-1 px-2 min-w-[256px]'onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="Email" />
            </label>
            <label htmlFor="password">

                <input className='border-2 py-1 px-2 min-w-[256px]'onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="Password (min. 6 characters)" />
            </label>
            <label htmlFor="confirmPassword">

<input className='border-2 py-1 px-2 min-w-[256px]'onChange={(e) => setConfirmPassword(e.target.value)} required type="confirmPassword" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
</label>
        <button type="submit"><div className="mt-4 border-2 text-white font-bold text-lg border-teal-200 px-2 py-2 w-[256px] rounded-lg bg-teal-400">Create Account</div></button>
<div  className='w-48'></div>

        </form>
            <button  className="w-[256px] mt-[-10px] text-right text-[14px]" onClick={goToSignIn}><p>Back to sign in</p></button>
            <div className="p-4 w-72 break-words">           
             {state === "ERROR" && (
        <p className="relative  mt-2 text-red-600">{errorMessage}</p>
      )}
      {state === "SUCCESS" && (
        <p className="relative  mt-2 text-green-600">Success!</p>
      )}</div>
    </div>



</div>);
}
