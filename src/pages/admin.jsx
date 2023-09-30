import React, { useEffect, useState } from "react";
import 'firebase/firestore';
import { collection, getFirestore, getDocs } from "firebase/firestore"; 
const Admin = () => {
  const [industryJobs, setIndustryJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [question, setQuestion] = useState('');

    

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
  }, []);

console.log(industryJobs)
  const handleJobChange = (e) => {
    setSelectedJob(e.target.value);
  };

  return (
    <form>
      <label htmlFor="jobSelect">Select Industry Job:</label>
      <select id="jobSelect" value={selectedJob} onChange={handleJobChange}>
        <option value="">Select a job</option>
        {industryJobs.map((job) => (
          <option key={job.ID}>
            {job.ID}
          </option>
        ))}
      </select>

      {selectedJob && (
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
  );
};


export default Admin;
