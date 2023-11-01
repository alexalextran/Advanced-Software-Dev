import React, { useEffect, useState } from "react";
import AnalyticsFields from "@/Components/AnalyticComponent";
import Navigation from "./navigation";
import { Value } from "sass";
import { useAuth } from "../../context/AuthContext";

const Analytics = () => {
  const { retrieveAnalytics, analytics } = useAuth();
  const [isAnalyticsPopulated, setIsAnalyticsPopulated] = useState(false);


  useEffect(() => {
    console.log(analytics)
  }, []);
  
  return (
    <div>
      <Navigation />
      <h1>AI Analytics</h1>
      <div className="analyticsForm">
        {isAnalyticsPopulated && (
          <debugger />
        )}
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
        <div style={{width: analytics?.Confidence,
    backgroundColor: "red",
    paddingRight: "0px",
    paddingTop: "20px",
    paddingBottom: "20px"
    }}>
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
        <div style={{width: analytics?.Coherence,
    backgroundColor: "green",
    paddingRight: "0px",
    paddingTop: "20px",
    paddingBottom: "20px"
    }}>
        
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
        <div style={{width: analytics?.Professionalism,
    backgroundColor: "blue",
    paddingRight: "0px",
    paddingTop: "20px",
    paddingBottom: "20px"
    }}>
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
        <div style={{width: analytics?.Creativity,
    backgroundColor: "yellow",
    paddingRight: "0px",
    paddingTop: "20px",
    paddingBottom: "20px"
    }}>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;