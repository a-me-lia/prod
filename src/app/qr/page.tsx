import { ImageOptimizerCache } from "next/dist/server/image-optimizer"
import Image from "next/image"

export default function Page(){
    return(
        <Image src='/qr.png' fill alt='qr code for https://carycspickup.vercel.app'/>
    )
}