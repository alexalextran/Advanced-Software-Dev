import "@/styles/globals.scss";
import "../styles/edward.css";
import "../styles/history.css";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AuthContextProvider } from "../../context/AuthContext";
import { useAuth } from "../../context/AuthContext";
export default function App({ Component, pageProps }) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user && router.pathname !== "/signupPage") {
      router.push("/");
    }
  }, [user]);

  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
