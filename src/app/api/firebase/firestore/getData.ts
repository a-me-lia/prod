/*import { getDatabase, ref, onValue } from "firebase/database";
import firebase_app from "../config";



let date = new Date().toUTCString().slice(0, 16);




var names: string[] = [];


export default async function getData() {
    const db = getDatabase(firebase_app);
    const nameRef = ref(db, 'names/' + date + '/username');
    onValue(nameRef, (snapshot) => {
      names.push = snapshot.val();
      console.log(snapshot.val)
    });
    return names;
  }*/