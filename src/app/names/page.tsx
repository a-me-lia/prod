"use client";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebase_app from "../api/firebase/config";
import Link from "next/link";
import useSound from "use-sound";

interface Entry {
  username: string;
  timestamp: string;
}

const Page = () => {
  const [play] = useSound("/ping.wav");
  const [entries, setEntries] = useState<Entry[]>([]);

  function Ping() {
    play();
  }

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
        const entriesList = entriesListU.filter((x) => x.username !== "hello");
        setEntries(entriesList);
      } else {
        setEntries([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  play();

  return (
    <div className="flex flex-col items-center  h-[calc(100dvh)]  xl:min-h-screen overflow-hidden bg-slate-700 text-white">
      <Link
        className="absolute left-2 top-2 border-2 border-opacity-30 rounded-lg border-white  px-2 py-1"
        href="/"
      >
        Back to entry
      </Link>

      <h1 className="text-2xl mt-16 xl:mt-2 xl:text-4xl">Names for pickup:</h1>
      <p className="mx-8 text-center mt-4 mb-2">
        click anywhere on the page to enable audio ping!
      </p>
      <div className="mt-4 w-full h-1 bg-gradient-to-b from-transparent via-white to-transparent  mx-auto"></div>

      <div className="relative overflow-y-auto w-full ">
        <div className="items-left flex flex-col">
          <ul className="flex flex-col items-left  overflow-hidden">
            {entries.map((entry, index) => (
              <li
                className="xl:ml-8 ml-2 flex flex-col text-2xl mt-6 mb-4 xl:w-full xl:mt-6 xl:mb-4 xl:text-5xl font-bold  text-white"
                key={index}
              >
                <div className="flex flex-row">
                  <div className=''>
                    <div>
                    <span>{entry.username}</span>
                    <span className="absolute xl:left-3/4 right-2  text-right font-normal text-sm xl:mt-4 xl:text-2xl">
                      Timestamp: {entry.timestamp}
                    </span>
                    </div>

                    <div className="mt-2 xl:mt-2 w-3/4 h-1 bg-gradient-to-b from-transparent via-white to-transparent  "></div>
                    
                  </div>
                  
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
