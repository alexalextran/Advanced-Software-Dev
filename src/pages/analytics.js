import React, { useEffect, useState } from "react";
import AnalyticsFields from "@/Components/AnalyticComponent";
import Navigation from "./navigation";
import { Value } from "sass";
import { useAuth } from "../../context/AuthContext";
import styles from '@/styles/analytics.module.scss'
const Analytics = () => {
  const { retrieveAnalytics, analytics, wordCountStat } = useAuth();
  const [isAnalyticsPopulated, setIsAnalyticsPopulated] = useState(false);


  useEffect(() => {
    console.log(analytics)
  }, []);
  
  return (
    <>
      <Navigation />
     
      <main className={styles.analyticsForm}>
      <h1>AI Analytics</h1>
        {isAnalyticsPopulated && (
          <debugger />
        )}
        <div>
          <p>Average Words Per minutes</p>
          {wordCountStat}
        </div>
        <h2>
          <AnalyticsFields
            label="Confidence: "
            type="String"
            name="Confidence"
            placeholder={analytics?.Confidence}
            disabled={true}
          />
        </h2>
        <div style={{width: "100%",
    backgroundColor: "gray",
    paddingRight: "0px"
    }}>
        <div className={styles.bar} style={{width: analytics?.Confidence}}>
        </div>
        </div>
        <h2>
          <AnalyticsFields
            label="Coherence: "
            type="String"
            name="Coherence"
            placeholder={analytics?.Coherence}
            disabled={true}
          />
        </h2>
        <div style={{width: "100%",
    backgroundColor: "gray",
    paddingRight: "0px"
    }}>
        <div className={styles.bar} style={{width: analytics?.Coherence}}>
        
        </div>
        </div>
        <h2>
          <AnalyticsFields
            label="Professionalism: "
            type="String"
            name="Professionalism"
            placeholder={analytics?.Professionalism}
            disabled={true}
          />
        </h2>
        <div style={{width: "100%",
    backgroundColor: "gray",
    paddingRight: "0px"
    }}>
        <div className={styles.bar} style={{width: analytics?.Professionalism}}>
        </div>
        </div>
        <h2>
          <AnalyticsFields
            label="Creativity: "
            type="String"
            name="Creativity"
            placeholder={analytics?.Creativity}
            disabled={true}
          />
        </h2>
        <div style={{width: "100%",
    backgroundColor: "gray",
    paddingRight: "0px"
    }}>
        <div className={styles.bar}style={{width: analytics?.Creativity}}>
        </div>
        </div>
      </main>
    </>
  );
};

export default Analytics;