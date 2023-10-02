import React, { useEffect, useState } from "react";
import JobItem from '../../Components/JobItem.jsx';
import Navigation from '../navigation.js';
import styles from '@/styles/job.module.scss'
import industryjobs from  '../../../public/data/industryJobs.js'
import 'firebase/firestore';
import { collection, getFirestore, getDocs, addDoc, query, where, doc, setDoc } from "firebase/firestore"; 

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

const Job = ({job}) => {
    const [industryJobS, setIndustryJobs] = useState([]);
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

    
    const [questionInfo, setquestionInfo] = useState()
    const selectedIndustry = industryJobS.find((industry) => industry.ID === job);

    

    return (
        <main className={styles.main}>
        <Navigation/>

        <div className={styles.jobs_container}>
            
            <div className={styles.listofjobs}>
            <h1> {job}</h1>
            
            {
  selectedIndustry && selectedIndustry.jobs && selectedIndustry.jobs.length > 0 && (
    selectedIndustry.jobs.map((job, index) => (
      <JobItem setquestionInfo={setquestionInfo} key={index} jobitem={job}></JobItem>
    ))
  )
}
            </div>
          <nav>
                <h1>Information</h1>
                <div>
                    <p>Time: </p> 
                    <span>&nbsp;</span>
                    <p>{questionInfo?.time}</p>  
                    
                </div>

                <div>
                    <p>Type Of Question:</p> 
                    <span>&nbsp;</span>
                    <p>{questionInfo?.tag} </p>
                </div>

                <div>
                    <p>Field Tested:</p> 
                    <span>&nbsp;</span>
                    <p>{questionInfo?.testing} </p>
                </div>

              <button>Start</button>
            </nav>
        </div>
            
        </main>
    );
}

export default Job;