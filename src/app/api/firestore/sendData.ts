import { doc, getFirestore, setDoc } from "firebase/firestore"; 
import firebase_app from "../firebase/config";

export const db = getFirestore(firebase_app);
export default async function handler(data: string) {
  await setDoc(doc(db, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });
}