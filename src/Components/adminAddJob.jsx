import React from 'react';
import {
    doc,
    setDoc,
} from "firebase/firestore"; 

const AdminAddJob = ({newJob, setNewJob, setJobsForSelectedIndustryJob, jobsForSelectedIndustryJob, db, selectedIndustryJob}) => {


    const handleAddJob = async () => {
        if (!selectedIndustryJob) {
          alert("Please select an industry job first.");
          return;
        }
      
        try {
          const jobDocumentRef = doc(db, 'industryJobs', selectedIndustryJob, 'jobs', newJob);
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
        <div>
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
