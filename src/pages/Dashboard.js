import React from 'react';
import styles from '@/styles/Dashboard.module.scss'
import Navigation from './navigation';
import IndustryCard from '@/Components/IndustryCard';

const industries = [{name: "It"},{ name: "Enginnering"},{ name: "Hospitality"}, {name: "Business"}, {name: "Healthcare"}, {name: "Goverment"}, {name: "Education"},  {name: "Trade"}, {name: "Construction"}]

const Dashboard = () => {
    return (
        <main className={styles.main}>
            <Navigation/>
            <div className={styles.industry_grid}>
            {
                industries.map((industry, index) => {
                return(<IndustryCard industry={industry.name} key={index}/>)
                })
            }
                
            </div>
        </main>
    );
}

export default Dashboard;
