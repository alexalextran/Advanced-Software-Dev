import React from 'react';

const AdminJobDropDown = ({setSelectedJob, jobsForSelectedIndustryJob, selectedJob}) => {
    return (
        <form>
          <label htmlFor="jobSelect">Select a Job from the Industry:</label>
          <select id="jobSelect" value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}>
            <option value="">Select a job</option>
            {jobsForSelectedIndustryJob.map((job) => (
              <option key={job.ID} value={job.ID}>
                {job.ID}
              </option>
            ))}
          </select>
        </form>
    );
}

export default AdminJobDropDown;
