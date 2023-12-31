import React from "react";
import Link from 'next/link'
import styles from "@/styles/navigation.module.scss";
const Navigation = () => {
  return (
    <div className={styles.topnavbar}>
      <Link href={"/Dashboard"}> Dashboard </Link>
      <Link href={"/history"}>History </Link>
      <Link href={"/profilePage"}>Profile </Link>
      <Link href={"/admin"}>Admin</Link>
    </div>
  );
};

export default Navigation;