import React from 'react';
import styles from '@/styles/Dashboard.module.scss'
import Navigation from './navigation';

const Dashboard = () => {
    return (
        <main className={styles.main}>
            <Navigation/>
            <div className={styles.industry_grid}>
                <div className={styles.industry_card}>bruh  <div className={styles.industry_image}>photo</div> </div>
                <div className={styles.industry_card}>bruh  <div className={styles.industry_image}>photo</div> </div>
                <div className={styles.industry_card}>bruh  <div className={styles.industry_image}>photo</div> </div>
                <div className={styles.industry_card}>bruh  <div className={styles.industry_image}>photo</div> </div>
                <div className={styles.industry_card}>bruh  <div className={styles.industry_image}>photo</div> </div>
                <div className={styles.industry_card}>bruh  <div className={styles.industry_image}>photo</div> </div>
                <div className={styles.industry_card}>bruh  <div className={styles.industry_image}>photo</div> </div>
                <div className={styles.industry_card}>bruh  <div className={styles.industry_image}>photo</div> </div>
                <div className={styles.industry_card}>bruh  <div className={styles.industry_image}>photo</div> </div>
                
            </div>
        </main>
    );
}

export default Dashboard;
