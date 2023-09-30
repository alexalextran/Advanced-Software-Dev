import React, { useEffect, useState } from "react";
import 'firebase/firestore';
import { collection, onSnapshot, getFirestore } from "firebase/firestore"; 
const Admin = () => {
  const [industryJobs, setIndustryJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [question, setQuestion] = useState('');

    

  const db = getFirestore();

  useEffect(() => {
      var unsubscribe = () => {}
      try {
        unsubscribe = onSnapshot(collection(db, 'industryJobs'), (snapshot) => {
        setIndustryJobs(snapshot.docs.map(doc => ({
          //generate array and populate with id and doc data
          ID: doc.id,
          ...doc.data(),
        })))
      })
    }
    catch{
    }
      return () => unsubscribe()
  }, [])

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
          <option key={job.id} value={job.id}>
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
