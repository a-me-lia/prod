import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn() {
  
  let result = null,
    error = null;

  var user = auth.currentUser;

  if (user) {
    return { result, error };
  } else {
    try {
      result = await signInWithEmailAndPassword(auth, 'hinasato86@gmail.com', '123456');
    } catch (e) {
      error = e;
    }
  }
  return { result, error };
}
