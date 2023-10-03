import React, { useEffect, useState } from "react";
import 'firebase/firestore';
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore"; 
import AdminIndustry from "@/Components/adminIndustry";
import AdminJobDropDown from "@/Components/adminJobDropDown";

const Admin = () => {
  const [industryJobs, setIndustryJobs] = useState([]);
  const [selectedIndustryJob, setSelectedIndustryJob] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [question, setQuestion] = useState('');
  const [jobsForSelectedIndustryJob, setJobsForSelectedIndustryJob] = useState([]);
  const [newJob, setNewJob] = useState('');
  const [questions, setQuestions] = useState([]); // State for questions

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

  const handleAddQuestion = async () => {
    if (!selectedJob) {
      alert("Please select a job first.");
      return;
    }

    if (!question) {
      alert("Please enter a question.");
      return;
    }

    try {
      const jobDocumentRef = doc(db, 'industryJobs', selectedIndustryJob, 'jobs', selectedJob);

      // Update the questions array for the selected job in Firestore
      await updateDoc(jobDocumentRef, {
        Questions: [...questions, question],
      });

      // Update the local state with the new question added
      setQuestions([...questions, question]);
      setQuestion('');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div>
  
      {
        <AdminIndustry industryJobs={industryJobs} db={db} setJobsForSelectedIndustryJob={setJobsForSelectedIndustryJob} selectedIndustryJob={selectedIndustryJob} setSelectedIndustryJob={setSelectedIndustryJob}/>
      }

      {selectedIndustryJob 
      && 
      (<AdminJobDropDown selectedJob={selectedJob} setSelectedJob={setSelectedJob} jobsForSelectedIndustryJob={jobsForSelectedIndustryJob}/>)
        }

      {selectedIndustryJob && selectedJob && (
        <div>
          <label htmlFor="newQuestion">Add a New Question:</label>
          <input
            type="text"
            id="newQuestion"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="button" onClick={handleAddQuestion}>Add Question</button>
        </div>
      )}

      {/* Render the added questions */}
      {selectedJob && questions.length > 0 && (
        <div>
          <h2>Added Questions:</h2>
          <ul>
            {questions.map((q, index) => (
              <li key={index}>{q}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form to add a new job */}
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
