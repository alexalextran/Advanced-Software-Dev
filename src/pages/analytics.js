import React, { useEffect } from "react";
import styles from "@/styles/analytic.module.scss";
import AnalyticsFields from "@/Components/AnalyticComponent";
import Navigation from "./navigation";
import { Value } from "sass";
import { useAuth } from "../../context/AuthContext";
const Analytics = () => {
  const { retrieveAnalytics, analytics } = useAuth();

  useEffect(() => {
    retrieveAnalytics;
  }, []);
  return (
    <div>
      <Navigation />
      <h1>AI Analytics</h1>
      <div className="analyticsForm">
        <h2>
          <AnalyticsFields
            label="Confidence: "
            type="String"
            name="Confidence"
            placeholder={analytics.analytics.Confidence} 
            disabled={true} 
          />
        </h2>
        <div className={styles.container}>
          <div className={styles.g1}></div>
        </div>
        <h2>
          <AnalyticsFields
            label="Coherence: "
            type="String"
            name="Coherence"
            placeholder={analytics.analytics.Coherence}
            disabled={true} 
          />
        </h2>
        <div className={styles.container}>
          <div className={styles.g2}></div>
        </div>
        <h2>
          <AnalyticsFields
            label="Professionalism: "
            type="String"
            name="Professionalism"
            placeholder={analytics.analytics.Professionalism}
            disabled={true} 
          />
        </h2>
        <div className={styles.container}>
          <div className={styles.g3}></div>
        </div>
        <h2>
          <AnalyticsFields
            label="Creativity: "
            type="String"
            name="Creativity"
            placeholder={analytics.analytics.Creativity}
            disabled={true} 
          />
        </h2>
        <div className={styles.container}>
          <div className={styles.g4}></div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
