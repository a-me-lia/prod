import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, push } from "firebase/database";
import firebase_app from "../config";

let date = new Date().toUTCString().slice(0, 16);

const getCurrentTime = (): string => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Pad with '0' to ensure two digits
  const padWithZero = (num: number): string =>
    num < 10 ? "0" + num : num.toString();

  return `${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(
    seconds,
  )}`;
};
const db = getDatabase(firebase_app);

console.log(getCurrentTime());

export default async function sendData(name: string) {
  const lastName = name;
  let result: any = null,
    error: any = null;

  if (name != "hello") {
    try {
      
      const lastSnapshot = await get(child(ref(db), date + "/"));
      const lastValue = lastSnapshot.val();

      let newindex = "00001";
      let lastName = null;

      if (lastValue) {
        const lastKey = Object.keys(lastValue).pop();
        const lastIndex = lastKey
          ? parseInt((lastKey.match(/\d+/g) || [])[0]!)
          : 0;
        newindex = `${lastIndex < 9999 ? 0 : ""}${lastIndex < 999 ? 0 : ""}${
          lastIndex < 99 ? 0 : ""
        }${lastIndex < 9 ? 0 : ""}${lastIndex + 1}`;
        console.log(newindex);
      }
      if (newindex == "NaN") {
        newindex = "00001";
      }

      console.log(getCurrentTime());
      const timestamp = getCurrentTime(); // Get the current timestamp in the format of hh:mm:ss
      const entry = {
        username: name,
        timestamp: timestamp,
      };
        result = await set(ref(db, date + "/" + newindex), entry);
      


      
 
    } catch (e: any) {
      error = e;
    }

    return { result, error };
  }

  return { result, error, lastName };
}
