"use client"
import React, { useState, useEffect, useRef} from 'react';
import { getDatabase, ref, onValue, off } from "firebase/database";
import firebase_app from "../api/firebase/config";
import useSound from 'use-sound';
import Link from 'next/link';

let date = new Date().toUTCString().slice(0, 16);


const GetDataComponent = () => {
  const [names, setNames] = useState<string[]>([]);
  const [play] = useSound('/ping.wav');

 

  useEffect(() => {
    const db = getDatabase(firebase_app);
    const nameRef = ref(db,   date + '/names'  + '/username');

    const listener = onValue(nameRef, (snapshot) => {
      if(snapshot.val() != "hello"){
      setNames(names => [ snapshot.val(), ...names ]);
      console.log(snapshot.val());
      }
    });

    return () => {
      off(nameRef, 'value', listener);  // Removing the listener when the component is unmounted
    };
  }, []);

  play();




  return (
    <div className='flex flex-col items-center  h-[calc(100dvh)] overflow-hidden bg-slate-700 text-white'>
              <Link className='absolute left-2 top-2'href='/entry'>Back to entry</Link>
        <Link className='absolute right-2 top-2'href='/'>Back to sign-in</Link>
      <h1 className='text-2xl mt-12 xl:text-4xl'>Names for pickup:</h1>
      <p className='mx-8 text-center mt-6 mb-2'>click anywhere on the page to enable audio ping!</p>    
        <p className='mx-8 text-center mt-2 mb-6 text-red-500'>###  REFRESHING WILL ERASE ENTRIES  ###</p>
      <div className='relative overflow-y-auto w-full mt-6 '>
      {names.map((name, index) => (

        <div className='items-center flex flex-col'>        
        <p 
        className='text-2xl mt-12 mb-4 w-2/3 xl:w-full xl:mt-24 xl:mb-8 xl:text-8xl font-bold text-center text-white'
        key={index}>{name}</p>
        <div className='w-3/4 h-1 bg-gradient-to-b from-transparent via-white to-transparent  mx-auto'></div>
        </div>
      ))}

      </div>
    </div>
  );
};

export default GetDataComponent;