"use client"
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off } from "firebase/database";
import firebase_app from "../api/firebase/config";

let date = new Date().toUTCString().slice(0, 16);

const GetDataComponent = () => {
  const [names, setNames] = useState<string[]>([]);

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

  return (
    <div className='flex flex-col items-center text-black'>
      <h1>Data Names:</h1>
      {names.map((name, index) => (
        <p 
        className='my-4 text-7xl'
        key={index}>{name}</p>
      ))}
    </div>
  );
};

export default GetDataComponent;