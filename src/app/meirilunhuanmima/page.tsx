import React from "react";
import sendCode from "../api/firebase/rtdb/sendCode";


export default function Page() {


    let date = new Date().toUTCString().slice(0, 16);
    function TSH(s:string){for(var i=0,h=9;i<s.length;)h=Math.imul(h^s.charCodeAt(i++),9**9);return h^h>>>9}

    const codeRef = TSH(date) % 100

    sendCode(codeRef);

    
    return (
    <div className="  h-screen  flex flex-col items-center bg-white  text-black overflow-hidden">
        <h1 className="hidden lg:block mt-12 text-7xl font-bold">TODAY'S CODE IS / 今天的密码是:</h1> 
        <h1 className="lg:hidden mt-24 text-4xl lg:mt-12 lg:text-7xl font-bold">TODAY'S CODE IS <br/> 今天的密码是:</h1>

        <div className="mt-16 lg:mt-8 px-12 py-6 lg:w-full lg:h-max drop-shadow-2xl bg-yellow-300 font-bold text-red-500 text-center text-[180px] lg:text-[420px] ">{codeRef}</div>


    </div>);
}