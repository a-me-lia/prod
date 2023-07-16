import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import firebase_app from "../config";



import { ref, set } from "firebase/database";


let date = new Date().toUTCString().slice(0, 16);

export default async function sendData(name:string) {
  const db = getDatabase(firebase_app);
  let result = null,
  error = null;
  try {
    result = await set(ref(db, 'names/' + date), {
      username: name,
    });
  } catch (e) {
    error = e;
}

return { result, error };
}