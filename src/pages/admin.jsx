import React, { useEffect, useState } from "react";
import 'firebase/firestore';
import {
  collection,
  getFirestore,
  getDocs,
} from "firebase/firestore"; 
import AdminIndustry from "@/Components/adminIndustry";
import AdminJobDropDown from "@/Components/adminJobDropDown";
import AdminAddQuestion from "@/Components/adminAddQuestion";
import AdminAddJob from "@/Components/adminAddJob";

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
        <AdminAddQuestion question={question} jobsForSelectedIndustryJob={jobsForSelectedIndustryJob} selectedJob={selectedJob} db={db} selectedIndustryJob={selectedIndustryJob} questions={questions} setQuestion={setQuestion} setQuestions={setQuestions} setJobsForSelectedIndustryJob={setJobsForSelectedIndustryJob}/>
      )}

      {/* Render the added questions */}
      {/* {selectedJob && questions.length > 0 && (
        <div>
          <h2>Added Questions:</h2>
          <ul>
            {questions.map((q, index) => (
              <li key={index}>{q}</li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Form to add a new job */}
      {selectedIndustryJob && (
       <AdminAddJob newJob={newJob} setNewJob={setNewJob} setJobsForSelectedIndustryJob={setJobsForSelectedIndustryJob} jobsForSelectedIndustryJob={jobsForSelectedIndustryJob} db={db} selectedIndustryJob={selectedIndustryJob}/>
      )}
    </div>
  );
};

export default Admin;
