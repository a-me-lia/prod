import Link from "next/link"
import Image from "next/image"

export default function Custom404() {
    return(
      <div className=" h-[calc(100dvh)] xl:min-h-screen  overflow-hidden text-black bg-white ">
        <div className="p-6 flex flex-col space-y-2 items-center">
        <h1 className="text-6xl">404</h1>
        <h1>Page Not Found!</h1>
        <Link href='/'>Back to Sign In</Link>
        </div>
        <div className='absolute bottom-0 translate-x-1/2'>
          <div className="relative h-72 w-48"></div>
        <Image src='/404.png' className='object-cover' alt='not found!' fill></Image>
        </div>

      </div>
    ) 
  }