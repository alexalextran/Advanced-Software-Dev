import React from 'react';
import styles from '@/styles/admin.module.scss';
const AdminJobDropDown = ({setSelectedJob, jobsArray, selectedJob}) => {
    return (
        <form className={styles.jobDropDown}>
          <label htmlFor="jobSelect">Select a Job from the Industry:</label>
          <select id="jobSelect" value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}>
            <option value="">Select a job</option>
            {jobsArray.map((job, index) => (
              <option key={index} value={job.ID}>
                {job.ID}
              </option>
            ))}
          </select>
        </form>
    );
}

export default AdminJobDropDown;
