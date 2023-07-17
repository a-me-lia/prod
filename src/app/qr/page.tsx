import { ImageOptimizerCache } from "next/dist/server/image-optimizer"
import Image from "next/image"

export default function Page(){
    return(
        <div className="h-[calc(100dvh)]  xl:min-h-screen">
                    <Image src='/qr.png' fill alt='qr code for https://carycspickup.vercel.app' className="aspect-square object-cover"/>
        </div>

    )
}