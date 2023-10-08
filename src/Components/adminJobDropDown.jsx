import React from 'react';
import styles from '@/styles/admin.module.scss';
import { useAuth } from "../../context/AuthContext";
const AdminJobDropDown = ({setSelectedJob, selectedJob}) => {
  const { jobsCollection} = useAuth();
    return (
        <form className={styles.jobDropDown}>
          <label htmlFor="jobSelect">Select a Job from the Industry:</label>
          <select id="jobSelect" value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}>
            <option value="">Select a job</option>
            {jobsCollection.map((job, index) => (
              <option key={index} value={job.ID}>
                {job.ID}
              </option>
            ))}
          </select>
        </form>
    );
}

export default AdminJobDropDown;
