"use client";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebase_app from "../api/firebase/config";
import Link from "next/link";
import useSound from "use-sound";
import signIn from "../api/firebase/auth/signin";

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

  signIn("hinasato86@gmail.com", "123456");

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
    <div className="flex flex-col items-center  h-[calc(100dvh)]  xl:min-h-screen max-h-screen overflow-hidden bg-white text-black">
      <h1 className="text-2xl mt-16 mb-12 xl:mt-8  xl:text-4xl">
        Names for pickup:
      </h1>

      <div className="relative overflow-y-auto w-full ">
        <ul className="flex flex-col items-left mt-2 overflow-hidden xl:mx-8 mx-2 ">
          {entries.map((entry, index) => (
            <li
              className="flex flex-col text-2xl mt-4 mb-2 xl:w-full xl:mt-4 xl:mb-2 xl:text-5xl font-bold  text-black"
              key={index}
            >
              <div className="flex flex-row justify-between items-baseline">
                <span>{entry.username}</span>
                <span className="text-right font-normal text-sm  xl:text-2xl">
                  Timestamp: {entry.timestamp}
                </span>
              </div>
              <div className="mt-2 xl:mt-2 w-full h-1 bg-gradient-to-b from-transparent via-black to-transparent  "></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
