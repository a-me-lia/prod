import Link from "next/link";
import Image from "next/image";

export default function Custom404() {
  return (
    <div className=" h-[calc(100dvh)] xl:min-h-screen  overflow-hidden text-black bg-white flex flex-col items-center">
      <div className="p-6 w-min flex flex-col mt-32 rounded-3xl space-y-2 items-center border-2 border-slate-500">
        <h1 className="text-8xl font-bold mb-4 border-2 border-red-400 p-4 rounded-xl">
          404
        </h1>
        <h1>Page Not Found!</h1>
        <Link href="/" className="underline">
          Back to Sign In
        </Link>
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="absolute bottom-0 translate-x-1/2">
          <div className="relative h-72 w-48"></div>
        </div>
      </div>
    </div>
  );
}
