import { ImageOptimizerCache } from "next/dist/server/image-optimizer";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  let date = new Date().toUTCString().slice(0, 16);
  function TSH(s: string) {
    for (var i = 0, h = 9; i < s.length; )
      h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
    return h ^ (h >>> 9);
  }

  const codeRef = Math.abs(TSH(date) % 100);

  return (
    <div className=" h-[calc(100dvh)]  xl:min-h-screen flex flex-col items-center bg-white">
      <Link
        className="absolute z-50 left-2 top-2 border-2 border-opacity-30 rounded-lg border-black  px-2 py-1"
        href="/"
      >
        Back to entry
      </Link>
      <div></div>
      <div className="absolute z-50 top-[64px] xl:top-[-96px] text-9xl  xl:text-[320px] text-red-500 font-bold">
        {codeRef}
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
