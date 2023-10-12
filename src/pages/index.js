import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import LoginPage from "./loginPage";


const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  return (
    <>
      <Head>
        <title>Clarichat</title>
        <meta name="description" content="Clarichat Start Preparing Today!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <LoginPage></LoginPage>
       
        </div>
      </main>
    </>
  );
  
}

