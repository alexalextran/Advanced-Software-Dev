import React from 'react';
import 'firebase/firestore';
import styles from '@/styles/admin.module.scss';
import { useAuth } from "../../context/AuthContext";
const AdminIndustry = ({selectedIndustry, setSelectedIndustry}) => {

    const { retrieveJobsData, industryArray } = useAuth();
    const handleIndustryJobChange = async (e) => {
        const selectedIndustryID = e.target.value;
        setSelectedIndustry(selectedIndustryID);
    
        const selectedIndustryJobData = industryArray.find((job) => job.ID === selectedIndustryID);

        if (selectedIndustryJobData) {
          try {
            retrieveJobsData(selectedIndustryJobData.ID)
          } catch (error) {
            console.error('Error fetching jobs for the selected industry job:', error);
          }
        }
      };


    return (
        <form className={styles.industryJob}>
        <label htmlFor="industryJobSelect">Select Industry:</label>
        <select id="industryJobSelect" value={selectedIndustry} onChange={handleIndustryJobChange}>
          <option value="">Select an Industry</option>
          {industryArray.map((job) => (
            <option key={job.ID} value={job.ID}>
              {job.ID}
            </option>
          ))}
        </select>
      </form>
    );
}

export default AdminIndustry;
