import React from 'react';
import styles from '@/styles/Dashboard.module.scss';
import Navigation from './navigation';
import IndustryCard from '@/Components/IndustryCard';
import Link from 'next/link';
import industries from '../../public/data/industryJobs.js';

const Dashboard = () => {
    return (
        // Main container for the dashboard
        <main className={styles.main}>
            {/* Navigation component */}
            <Navigation />

            {/* Grid for displaying industry cards */}
            <div className={styles.industry_grid}>
                {
                    // Map through the industries array to generate industry cards
                    industries.map((industry, index) => (
                        <Link className={styles.link} href={`/jobs/${industry.IndustryName}`} key={index}>
                            {/* Individual Industry Card component */}
                            <IndustryCard industry={industry} />
                        </Link>
                    ))
                }
            </div>
        </main>
    );
}

export default Dashboard;
