import { ImageOptimizerCache } from "next/dist/server/image-optimizer"
import Image from "next/image"
import Link from "next/link"

export default function Page(){
    return(
        <div className=" h-[calc(100dvh)]  xl:min-h-screen flex flex-col items-center bg-white">
                  <Link
        className="absolute z-50 left-2 top-2 border-2 border-opacity-30 rounded-lg border-black  px-2 py-1"
        href="/"
      >
        Back to entry
      </Link>
            <div className="relative mt-8 w-full xl:w-min xl:h-screen xl:aspect-square aspect-square ">
            <Image src='/qr.png' fill alt='qr code for https://carycspickup.vercel.app' className="aspect-square object-cover"/>
            </div>

            <div className="absolute bottom-0 w-full">
      <div className="absolute bottom-0 translate-x-1/2">
        <div className="relative h-72 w-48">
        <Image
          src="/confuse.png"
          className="object-cover"
          alt="not found!"
          fill
        ></Image>
        </div>

      </div>
      </div>
        </div>

    )
}