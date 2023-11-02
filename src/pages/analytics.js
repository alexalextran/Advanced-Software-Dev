import React, { useState } from "react";
import AnalyticsFields from "@/Components/AnalyticComponent";
import Navigation from "./navigation";
import { useAuth } from "../../context/AuthContext";
import styles from "@/styles/analytics.module.scss";

const Analytics = () => {
  // Get analytics and wordCountStat from the context
  const { analytics, wordCountStat } = useAuth();

  // State to track if analytics are populated
  const [isAnalyticsPopulated, setIsAnalyticsPopulated] = useState(false);

  // Function to categorize word count
  function getWordCountCategory(wordCount) {
    if (wordCount < 30) {
      return "Very Short";
    } else if (wordCount < 80) {
      return "Short";
    } else if (wordCount < 120) {
      return "Medium";
    } else if (wordCount < 200) {
      return "Long";
    } else {
      return "Very Long";
    }
  }

  return (
    <>
      <Navigation />

      <main className={styles.analyticsForm}>
        {/* Title */}
        <h1>AI Analytics</h1>

        {/* Debugger conditionally shown */}
        {isAnalyticsPopulated && <debugger />}

        <section>
          {/* Word Count */}
          <div>
            <p>Word Count</p>
            <span>{wordCountStat}</span>
          </div>

          {/* Estimated Speaking Time */}
          <div>
            <p>Estimated Speaking Time</p>
            <span>
              {(wordCountStat / (140 / 60)).toFixed(1)} Seconds
            </span>
          </div>

          {/* Response Length based on the word count category */}
          <div>
            <p>Response Length</p>
            <span>{getWordCountCategory(wordCountStat)}</span>
          </div>
        </section>

        {[
          // Map over analytics fields and render them
          { label: "Confidence", placeholder: analytics?.Confidence },
          { label: "Coherence", placeholder: analytics?.Coherence },
          { label: "Professionalism", placeholder: analytics?.Professionalism },
          { label: "Creativity", placeholder: analytics?.Creativity },
        ].map((field, index) => (
          <>
            <h2>
              <AnalyticsFields label={`${field.label}: `} placeholder={field.placeholder} />
            </h2>
            <div key={index} style={{ width: "100%", backgroundColor: "gray", paddingRight: "0px" }}>
              {/* Render progress bar for each field */}
              <div className={styles.bar} style={{ width: field.placeholder }}></div>
            </div>
          </>
        ))}
      </main>
    </>
  );
};

export default Analytics;
