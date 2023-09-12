import React from 'react';
import styles from "@/styles/analytic.module.scss"
import AnalyticsFields from "@/Components/AnalyticComponent";
import Navigation from "./navigation";
import { Value } from 'sass';

const Analytics = () => {
    return (
        <div>
            <Navigation />
            <h1>AI Analytics</h1>
            <div className="analyticsForm">
                <h2>        
                    <AnalyticsFields
                            label="Confidence: "
                            type="String"
                            name="rate"
                            placeholder="90%" //Need to put rated score date from database 
                            disabled="true" //Always need to be disabled to edit the value by users, only can be changed as the value change in the database
                    />
                </h2>
                <div className={styles.container}>  
                    <div className={styles.g1}></div>
                </div> 
                <h2>        
                    <AnalyticsFields
                            label="Coherence: "
                            type="String"
                            name="rate"
                            placeholder="60%" //Need to put rated score date from database 
                            disabled="true" //Always need to be disabled to edit the value by users, only can be changed as the value change in the database
                    />
                </h2>
                <div className={styles.container}>  
                    <div className={styles.g2}></div>
                </div>
                <h2>        
                    <AnalyticsFields
                            label="Professionalism: "
                            type="String"
                            name="rate"
                            placeholder="40%" //Need to put rated score date from database 
                            disabled="true" //Always need to be disabled to edit the value by users, only can be changed as the value change in the database
                    />
                </h2>
                <div className={styles.container}>  
                    <div className={styles.g3}></div>
                </div>  
                <h2>        
                    <AnalyticsFields
                            label="Creativity: "
                            type="String"
                            name="rate"
                            placeholder="85%" //Need to put rated score date from database 
                            disabled="true" //Always need to be disabled to edit the value by users, only can be changed as the value change in the database
                    />
                </h2>
                <div className={styles.container}>  
                    <div className={styles.g4}></div>
                </div> 
            </div>
        </div>
    );
}

export default Analytics;
