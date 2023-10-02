import React, { useEffect } from 'react';
import styles from '@/styles/Dashboard.module.scss'
import Navigation from './navigation';
import IndustryCard from '@/Components/IndustryCard';
import Link from 'next/link'
import industries from  '../../public/data/industryJobs.js'
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from '../../context/AuthContext'


const Dashboard = () => {

    const { db } = useAuth()

    async function getIndustryData() {
      const querySnapshot =  await getDocs(collection(db, "industryJobs"));
        querySnapshot.forEach((doc) => {
        
        });
    }

    getIndustryData()


    return (
        <main className={styles.main}>
            <Navigation/>
            <div className={styles.industry_grid}>
            {
                industries.map((industry, index) => {
                return(  <Link className={styles.link} href={`/jobs/${industry.IndustryName}`} key={index}><IndustryCard industry={industry} />   </Link> )
                })
            }
                
            </div>
        </main>
    );
}

export default Dashboard;
