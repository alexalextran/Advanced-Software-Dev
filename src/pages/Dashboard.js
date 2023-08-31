import React from 'react';
import styles from '@/styles/Dashboard.module.scss'
import Navigation from './navigation';
import IndustryCard from '@/Components/IndustryCard';
import Link from 'next/link'
import industries from  '../../public/data/industryJobs.js'

const Dashboard = () => {
    return (
        <main className={styles.main}>
            <Navigation/>
            <div className={styles.industry_grid}>
            {
                industries.map((industry, index) => {
                return(  <Link href={`/jobs/${industry.IndustryName}`} key={index}><IndustryCard industry={industry.IndustryName} />   </Link> )
                })
            }
                
            </div>
        </main>
    );
}

export default Dashboard;
