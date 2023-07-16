
'use client'
import './globals.css'
import { AuthContextProvider } from './context/authcontext'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <title>CCS Summer Pickup</title>
      <body className={inter.className}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
        <p className='absolute bottom-2 left-2 w-2/3 text-slate-400 text-[10px]'>Developed by Marin Zheng  <br/><Link href='https://onetruebiribiri.com'>OneTrueBiriBiri.com</Link></p>
        <div className='absolute bottom-0 right-6 md:left-36 w-12 h-10'><Image src='/imouto.png' alt='misaka imouto' fill sizes="100vw" className='object-cover'></Image></div>
      </body>
    </html>
  )
}

