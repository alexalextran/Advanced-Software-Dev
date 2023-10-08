import React from 'react';
import {
    doc,
    setDoc,
} from "firebase/firestore"; 
import styles from '@/styles/admin.module.scss';
const AdminAddJob = ({newJob, setNewJob, setJobsForSelectedIndustryJob, jobsForSelectedIndustryJob, db, selectedIndustry}) => {


    const handleAddJob = async () => {
        if (!selectedIndustry) {
          alert("Please select an industry job first.");
          return;
        }
      
        try {
          const jobDocumentRef = doc(db, 'industryJobs', selectedIndustry, 'jobs', newJob);
          const jobObj = {
            Name: newJob,
            Questions: [],
          };
    
          await setDoc(jobDocumentRef, { jobObj });
    
          setJobsForSelectedIndustryJob([...jobsForSelectedIndustryJob, newJob]);
          setNewJob('');
        } catch (error) {
          console.error('Error adding job:', error);
        }
      };


    return (
        <div className={styles.addJob}>
        <label htmlFor="newJob">Add a New Job:</label>
        <input
          type="text"
          id="newJob"
          value={newJob}
          onChange={(e) => setNewJob(e.target.value)}
        />
        <button type="button" onClick={handleAddJob}>Add Job</button>
      </div>
    );
}

export default AdminAddJob;
