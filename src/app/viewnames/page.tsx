"use client"
import React, { useState, useEffect, useRef} from 'react';
import { getDatabase, ref, onValue, off } from "firebase/database";
import firebase_app from "../api/firebase/config";
import useSound from 'use-sound';

let date = new Date().toUTCString().slice(0, 16);


const GetDataComponent = () => {
  const [names, setNames] = useState<string[]>([]);
  const [play] = useSound('/ping.wav');

 

  useEffect(() => {
    const db = getDatabase(firebase_app);
    const nameRef = ref(db, 'names/' + date + '/username');

    const listener = onValue(nameRef, (snapshot) => {
      setNames(names => [...names, snapshot.val()]);
      console.log(snapshot.val());

    });

    return () => {
      off(nameRef, 'value', listener);  // Removing the listener when the component is unmounted
    };
  }, []);

  play();


  return (
    <div className='flex flex-col items-center min-h-screen bg-slate-50 text-black'>
      <h1>Data Names:</h1>
      {names.map((name, index) => (
        <p 
        className='my-4 text-7xl text-black'
        key={index}>{name}</p>
      ))}

    </div>
  );
};

export default GetDataComponent;