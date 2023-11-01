import React, { useEffect, useState } from "react";
import JobItem from '../../Components/JobItem.jsx';
import Navigation from '../navigation.js';
import styles from '@/styles/job.module.scss'
import 'firebase/firestore';
import { collection, getFirestore, getDocs} from "firebase/firestore"; 
import Link from 'next/link'
import { useAuth } from "../../../context/AuthContext";
export const getStaticPaths = async () => {

    const db = getFirestore();
        var jobsData
        
          const industryJobsRef = collection(db, 'industryJobs');
          const snapshot = await getDocs(industryJobsRef);
           jobsData = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));

          const paths = jobsData.map(industry => {
            return{
                params: {job: industry.ID.toString()}
            }
        })
        return{
            paths,
            fallback: false
        }


       
      

    //generates all possible routes and links for every project
       
       
    }

    

export const getStaticProps = async (context) => {
    //filters out the projects from the object by using the context params
const job = context.params.job
return{
    props: { job: job.toString()}
};
}


const Job = ({ job }) => {
  const [industryJobs, setIndustryJobs] = useState([]);
  const [questionInfo, setQuestionInfo] = useState();
  const { setindustrySelected } = useAuth();
  useEffect(() => {
      const fetchData = async () => {
          try {
              const db = getFirestore();
              const industryJobsRef = collection(db, 'industryJobs');
              const industrySnapshot = await getDocs(industryJobsRef);
              const industryData = industrySnapshot.docs.map((doc) => ({
                  ID: doc.id,
                  ...doc.data(),
              }));

              // Find the selected industry based on the job parameter
              const selectedIndustry = industryData.find((industry) => industry.ID === job);

              if (selectedIndustry) {
                  const subcategoryJobsRef = collection(industryJobsRef, selectedIndustry.ID, 'jobs');
                  const subcategorySnapshot = await getDocs(subcategoryJobsRef);
                  const subcategoryData = subcategorySnapshot.docs.map((doc) => ({
                      ID: doc.id,
                      ...doc.data(),
                  }));
                  setIndustryJobs(subcategoryData);
              }
          } catch (error) {
              console.error('Error fetching industry jobs:', error);
          }
      };

      fetchData();
      setindustrySelected(job)
  }, [job]);

  

  return (
      <main className={styles.main}>
          <Navigation />

          <div className={styles.jobs_container}>
              <div className={styles.listofjobs}>
                  <h1>{job}</h1>

                  {industryJobs.length > 0 && (
                      industryJobs.map((jobItem, index) => (
                          <JobItem setquestionInfo={setQuestionInfo} key={index} jobitem={jobItem}></JobItem>
                      ))
                  )}
              </div>
              <nav>
                  <h1>Question Selected</h1>
                      <h4>{questionInfo}</h4>
                        <p>Click start to begin the interview</p>
                        <button onClick={() => {
                            if(questionInfo === undefined){
                                alert("Please select a question first")
                                return
                            }
                        }}>
                        {questionInfo ? (
                            <Link href="/openai">
                                 Start
                            </Link>
                        ) : (
                        <span>Start</span>
                 )}
                    </button>
              </nav>
          </div>
      </main>
  );
}

export default Job;