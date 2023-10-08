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
import AdminLogOn from "@/Components/adminLogOn";
import styles from '@/styles/admin.module.scss';
import Navigation from "./navigation";

const Admin = () => {
  const [industryArray, setIndustryArray] = useState([]); //all industries e.g --> IT, Hospitality, Finance etc
  const [selectedIndustry, setSelectedIndustry] = useState(''); //chosen industry --> IT
  const [jobsArray, setJobsArray] = useState([]); // jobs for the selected industry --> IT --> softare developer, tester etc
  const [selectedJob, setSelectedJob] = useState(''); //chosen job --> software developer

  const [question, setQuestion] = useState('');
  const [newJob, setNewJob] = useState('');
  const [questions, setQuestions] = useState([]); // State for questions

  const db = getFirestore();

  const [adminLoggedIn, setadminLoggedIn] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const industryJobsRef = collection(db, 'industryJobs');
        const snapshot = await getDocs(industryJobsRef);
        const jobsData = snapshot.docs.map((doc) => ({
          ID: doc.id,
          ...doc.data(),
        }));
        setIndustryArray(jobsData);
      } catch (error) {
        console.error('Error fetching industry jobs:', error);
      }
    };

    fetchData();
  }, [db]);

  

  

  

  return (
    <>
    <Navigation/>
  
      {!adminLoggedIn ? (
        <AdminLogOn db={db} setadminLoggedIn={setadminLoggedIn}/>
      ) : (
        
          <div className={styles.main}>
        <div className={styles.mainLeft}>
          <AdminIndustry
            industryArray={industryArray}
            db={db}
            setJobsArray={setJobsArray}
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
          />

            {selectedIndustry && (
            <AdminAddJob
              newJob={newJob}
              setNewJob={setNewJob}
              setJobsArray={setJobsArray}
              jobsArray={jobsArray}
              db={db}
              selectedIndustry={selectedIndustry}
            />
          )}
        </div>

          <div className={styles.mainRight}>
          {selectedIndustry && (
            <AdminJobDropDown
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
              jobsArray={jobsArray}
            />
          )}
          {selectedIndustry && selectedJob && (
            <AdminAddQuestion
              question={question}
              jobsArray={jobsArray}
              selectedJob={selectedJob}
              db={db}
              selectedIndustry={selectedIndustry}
              questions={questions}
              setQuestion={setQuestion}
              setQuestions={setQuestions}
              setJobsArray={setJobsArray}
            />
          )}
          </div>
        </div>
      )}
    </>
  );
}
 
   


export default Admin;
