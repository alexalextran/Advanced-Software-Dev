import React from 'react';
import styles from '@/styles/navigation.module.scss'
const Navigation = () => {
    return (
        <div className={styles.topnavbar}>
          <a href="#">Dashboardddddd</a>
          <a href="#">Analytics</a>
          <a href="#">History</a>
          <a href="#">Profile</a>
        </div>
      );
}

export default Navigation;
