import React, { useEffect, useState } from "react";
import 'firebase/firestore';
import { collection, getFirestore, getDocs, addDoc, query, where, doc, setDoc } from "firebase/firestore"; 

const Admin = () => {
  const [industryJobs, setIndustryJobs] = useState([]);
  const [selectedIndustryJob, setSelectedIndustryJob] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [question, setQuestion] = useState('');
  const [jobsForSelectedIndustryJob, setJobsForSelectedIndustryJob] = useState([]);
  const [newJob, setNewJob] = useState('');

  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const industryJobsRef = collection(db, 'industryJobs');
        const snapshot = await getDocs(industryJobsRef);
        const jobsData = snapshot.docs.map((doc) => ({
          ID: doc.id,
          ...doc.data(),
        }));
        setIndustryJobs(jobsData);
      } catch (error) {
        console.error('Error fetching industry jobs:', error);
      }
    };

    fetchData();
  }, [db]);

  const handleIndustryJobChange = async (e) => {
    const selectedJobId = e.target.value;
    setSelectedIndustryJob(selectedJobId);

    // Find the selected industry job and get its associated jobs
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

  const handleAddJob = async () => {
    // Ensure a job is selected
    if (!selectedIndustryJob) {
      alert("Please select an industry job first.");
      return;
    }
  
    try {
      const jobDocumentRef = doc(db, 'industryJobs', selectedIndustryJob, 'jobs', newJob);
      const jobobj = {
        Name: newJob,
      };
      // Add the new job document to the 'jobs' subcollection
      await setDoc(jobDocumentRef, { jobobj });
  
      // Update the local state with the new job added
      setJobsForSelectedIndustryJob([...jobsForSelectedIndustryJob, newJob]);
      setNewJob('');
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };
  

  return (
    <div>
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

        {selectedIndustryJob && (
          <div>
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
        )}

        <button type="submit">Submit</button>
      </form>

      {selectedIndustryJob && (
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
      )}

      {selectedIndustryJob && (
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
      )}
    </div>
  );
};

export default Admin;
