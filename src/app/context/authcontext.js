"use client";
import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "../api/firebase/config";
import { NextPageContext } from "next";
import Link from "next/link";

function reload() {
  location.reload();
}

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-slate-600 text-xl font-semibold">
            Loading...
          </h2>
          <p className="w-64 mt-4 text-center text-slate-600">
            If you&apos;re on this for a while, refresh and try again
          </p>
        </div>
      ) : user ||
        window.location.pathname == "/" ||
        window.location.pathname == "/names" ||
        window.location.pathname == "/qr" ? (
        children
      ) : (
        <div className="min-h-screen bg-white">
          <div className="border-2 border-red-500 p-4 bg-red-300">
            Unauthenticated, please click{" "}
            <Link className=" underline" href="/">
              {" "}
              sign in
            </Link>{" "}
            and then{" "}
            <button className="underline" onClick={reload}>
              <p>refresh.</p>
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
