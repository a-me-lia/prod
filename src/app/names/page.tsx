"use client"
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebase_app from "../api/firebase/config";
import Link from "next/link";

interface Entry {
  username: string;
  timestamp: string;
}

const Page = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const db = getDatabase(firebase_app);
    const currentDate = new Date().toUTCString().slice(0, 16);
    const entriesRef = ref(db, `${currentDate}`);

    const unsubscribe = onValue(entriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entriesListU: Entry[] = Object.entries(data)
          .map(([key, value]: [string, any]) => ({
            username: value.username,
            timestamp: value.timestamp || "", // Added safety check for undefined timestamp
          }))
          .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
          const entriesList = entriesListU.filter(
            x => x.username !== 'hello'
          )
        setEntries(entriesList);
      } else {
        setEntries([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (

<div className='flex flex-col items-center  h-[calc(100dvh)] overflow-hidden bg-slate-700 text-white'>
  <Link className='absolute left-2 top-2 border-2 border-opacity-30 rounded-lg border-white  px-2 py-1'href='/entry'>Back to entry</Link>
  <Link className='absolute right-2 top-2 border-2 border-opacity-30 rounded-lg border-white  px-2 py-1'href='/'>Back to sign-in</Link>
  <h1 className='text-2xl mt-12 xl:text-4xl'>Names for pickup:</h1>
  <p className='mx-8 text-center mt-6 mb-2'>click anywhere on the page to enable audio ping!</p>   
  <div className='mt-4 w-full h-1 bg-gradient-to-b from-transparent via-white to-transparent  mx-auto'></div>
  
  <div className='relative overflow-y-auto w-full '>

    <div className='items-center flex flex-col'>        

      <ul className="flex flex-col items-center">
        {entries.map((entry, index) => (
          <li className='flex flex-col text-2xl mt-12 mb-4 w-2/3 xl:w-full xl:mt-24 xl:mb-8 xl:text-7xl font-bold text-center text-white' key={index}>
            <span>{entry.username}</span>
            <span className="mt-4 text-4xl">Timestamp: {entry.timestamp}</span>
            <div className='mt-4 w-3/4 h-1 bg-gradient-to-b from-transparent via-white to-transparent  mx-auto'></div>
          </li>
        ))}
      </ul>


</div>

</div>
</div>

  );
};

export default Page;