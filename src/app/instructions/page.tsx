import Link from "next/link";

export default function Instructions() {
  return (
  <div className=" flex flex-col p-4 min-h-screen">

    <div className="mt-24">
        <Link href='/instructions/en'>PDF - English</Link>
        <Link href='/instructions/cn'>PDF - 中文</Link>
    </div>
    
    </div>)
}
