import React from 'react';
import 'firebase/firestore';
import {
  collection,
  getDocs,
} from "firebase/firestore"; 
const AdminIndustry = ({industryJobs, selectedIndustryJob, setSelectedIndustryJob, db, setJobsForSelectedIndustryJob}) => {

    const handleIndustryJobChange = async (e) => {
        const selectedJobId = e.target.value;
        setSelectedIndustryJob(selectedJobId);
    
        const selectedIndustryJobData = industryJobs.find((job) => job.ID === selectedJobId);
        if (selectedIndustryJobData) {
          try {
            const jobsCollectionRef = collection(db, 'industryJobs', selectedJobId, 'jobs');
            const jobsSnapshot = await getDocs(jobsCollectionRef);
            const jobsData = jobsSnapshot.docs.map((doc) => ({
              ID: doc.id,
              ...doc.data(),
            }));
            setJobsForSelectedIndustryJob(jobsData);
          } catch (error) {
            console.error('Error fetching jobs for the selected industry job:', error);
          }
        }
      };


    return (
        <form>
        <label htmlFor="industryJobSelect">Select Industry Job:</label>
        <select id="industryJobSelect" value={selectedIndustryJob} onChange={handleIndustryJobChange}>
          <option value="">Select an industry job</option>
          {industryJobs.map((job) => (
            <option key={job.ID} value={job.ID}>
              {job.ID}
            </option>
          ))}
        </select>
      </form>
    );
}

export default AdminIndustry;
