import React from 'react';
import {
    doc,
    setDoc,
} from "firebase/firestore"; 
import styles from '@/styles/admin.module.scss';
const AdminAddJob = ({newJob, setNewJob, setJobsArray, jobsArray, db, selectedIndustry}) => {


    const handleAddJob = async () => {
        if (!selectedIndustry) {
          alert("Please select an industry job first.");
          return;
        }
      
        try {
         
      
          await setDoc(doc(db, 'industryJobs', selectedIndustry, 'jobs', newJob), {
            Name: newJob,
            Questions: [],
          });
    
          setJobsArray([...jobsArray, newJob]);
          setNewJob('');
          window.alert('Job added successfully!');
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
