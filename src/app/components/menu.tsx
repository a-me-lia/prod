import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const [active, setActive] = useState(false);

  return (
    <div className={`fixed z-50 top-0 w-full transition-all duration-1000 ease-in-out overflow-hidden  ${active ?  "h-80 bg-black opacity-[86%]": "h-14"}`}
    onClick={()=>setActive(!active)}>
      <div className="h-12 mt-2 w-full flex flex-row items-center">
        <div className="flex flex-col  ml-4    items-center ">
          <ul className="flex flex-col justify-between h-6 ">
            <li
              className={`w-9 h-1 rounded-full transition-transform duration-500 ${
                active ? "bg-white rotate-[-45deg] translate-x-1.5 translate-y-2.5" : ""
              } ${
                true && !active ? " bg-gray-700" : "bg-white"
              }`}
            ></li>
            <li
              className={`w-12 h-1 rounded-full ${
                active ? "hidden" : "block"
              } ${true && !active ? " bg-gray-700" : "bg-white"}`}
            ></li>
            <li
              className={`w-9 ml-3 h-1 rounded-full duration-500 ${
                active ? "bg-white rotate-45  -translate-y-2.5  -translate-x-1.5" : ""
              }
              ${
                true && !active ? " bg-gray-700" : "bg-white"
              }`}
            ></li>
          </ul>
        </div>
      </div>


      <div className={`p-4 `}>

        <div className="flex flex-col text-white font-bold text-[32px] space-y-2">
            <Link className="hover:underline" href='/'>home</Link>
            <Link className="hover:underline" href='/names'>live names list</Link>
            <Link className="hover:underline" href='/qr'>scan qr</Link>
            <div className="flex flex-row space-x-4 items-baseline ">
            <Link className="hover:underline text-[16px] mt-8" href='/meirilunhuanmima'>daily code</Link>
            <Link className="hover:underline text-[16px]" href='/instructions'>instructions</Link>
            <Link className="hover:underline text-[16px]" href='/about'>about</Link>
            </div>

        </div>

        </div>
    </div>
  );
}
