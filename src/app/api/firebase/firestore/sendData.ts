import { doc, getFirestore, setDoc } from "firebase/firestore"; 
import firebase_app from "../config";

export const db = getFirestore(firebase_app);
export default async function sendData(data: string) {
  let result = null;
  let error = null;

  try {

  await setDoc(doc(db, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });
  } catch (e) {
    error = e;
  }

  return { result, error };
}