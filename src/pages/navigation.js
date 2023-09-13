import React from "react";
import styles from "@/styles/navigation.module.scss";
const Navigation = () => {
  return (
    <div className={styles.topnavbar}>
      <a href="#">Dashboard</a>
      <a href="analytics">Analytics</a>
      <a href="history">History</a>
      <a href="profilePage">Profile</a>
    </div>
  );
};

export default Navigation;