import Link from "next/link";
import { useState } from "react";
import { useContext } from "react";
import { LanguageContext } from "../context/languagecontext";

export default function Menu() {
  const [active, setActive] = useState(false);
  let isEn = useContext(LanguageContext);

  return (
    <div
      className={`fixed top-0 w-full transition-all duration-1000 ease-in-out overflow-hidden  ${
        active ? " z-50 h-80 bg-black opacity-[86%]" : "z-30 h-14"
      }`}
      onMouseLeave={()=>setActive(false)}
    >
      <div className="h-12 mt-2 w-full flex flex-row items-center">
        <div className="flex flex-col  ml-4    items-center ">
          <ul
            className="flex flex-col justify-between h-6 "
            onClick={() => setActive(!active)}
          >
            <li
              className={`w-9 h-1 rounded-full transition-transform duration-500 ${
                active
                  ? "bg-white rotate-[-45deg] translate-x-1.5 translate-y-2.5"
                  : ""
              } ${true && !active ? " bg-gray-700" : "bg-white"}`}
            ></li>
            <li
              className={`w-12 h-1 rounded-full ${
                active ? "hidden" : "block"
              } ${true && !active ? " bg-gray-700" : "bg-white"}`}
            ></li>
            <li
              className={`w-9 ml-3 h-1 rounded-full duration-500 ${
                active
                  ? "bg-white rotate-45  -translate-y-2.5  -translate-x-1.5"
                  : ""
              }
              ${true && !active ? " bg-gray-700" : "bg-white"}`}
            ></li>
          </ul>
        </div>
      </div>

      <div className={`p-4 `}>
        <div className="flex flex-col text-white font-bold text-[32px] space-y-2">
          <Link  onClick={()=>setActive(false)} className="hover:underline" href="/">
            {`${isEn ? 'home' : '主页'}`}
          </Link>
          <Link  onClick={()=>setActive(false)} className="hover:underline" href="/names">
          {`${isEn ? 'live names list' : '实时姓名列表'}`}
          </Link>
          <Link  onClick={()=>setActive(false)} className="hover:underline" href="/qr">
          {`${isEn ? 'qr code' : '网站二维码'}`}
          </Link>
          <div className="flex flex-row space-x-4 items-baseline ">
            <Link  onClick={()=>setActive(false)} 
              className="hover:underline text-[16px] mt-8"
              href="/meirilunhuanmima"
            >
          {`${isEn ? 'daily code' : '每日轮换密码'}`}
            </Link>
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <Link onClick={()=>setActive(false)} className="hover:underline text-[16px]" href="/instructions">
            {`${isEn ? 'instructions' : '说明'}`}
            </Link>
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <Link onClick={()=>setActive(false)}  className="hover:underline text-[16px]" href="/about">
            {`${isEn ? 'about' : '网站信息页'}`}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
