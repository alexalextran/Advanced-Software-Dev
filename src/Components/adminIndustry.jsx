import React from 'react';
import 'firebase/firestore';
import {
  collection,
  getDocs,
} from "firebase/firestore"; 
const AdminIndustry = ({industryArray, selectedIndustry, setSelectedIndustry, db, setJobsArray}) => {

    const handleIndustryJobChange = async (e) => {
        const selectedIndustryID = e.target.value;
        setSelectedIndustry(selectedIndustryID);
    
        const selectedIndustryJobData = industryArray.find((job) => job.ID === selectedIndustryID);

        if (selectedIndustryJobData) {
          try {
            const jobsCollectionRef = collection(db, 'industryJobs', selectedIndustryID, 'jobs');
            const jobsSnapshot = await getDocs(jobsCollectionRef);
            const jobsData = jobsSnapshot.docs.map((doc) => ({
              ID: doc.id,
              ...doc.data(),
            }));
            setJobsArray(jobsData);
          } catch (error) {
            console.error('Error fetching jobs for the selected industry job:', error);
          }
        }
      };


    return (
        <form>
        <label htmlFor="industryJobSelect">Select Industry Job:</label>
        <select id="industryJobSelect" value={selectedIndustry} onChange={handleIndustryJobChange}>
          <option value="">Select an industry job</option>
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
