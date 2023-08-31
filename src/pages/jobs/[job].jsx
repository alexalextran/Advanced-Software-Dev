import React from 'react';
import JobItem from '../../Components/JobItem.jsx';
import Navigation from '../navigation.js';
import styles from '@/styles/job.module.scss'
import industryjobs from  '../../../public/data/industryJobs.js'

export const getStaticPaths = () => {
    //generates all possible routes and links for every project
        const paths = industryjobs.map(industry => {
            return{
                params: {job: industry.IndustryName}
            }
        })
        return{
            paths,
            fallback: false
        }
    }

    

export const getStaticProps = async (context) => {
    //filters out the projects from the object by using the context params
const job = context.params.job
return{
    props: { job: job.toString()}
};
}

const Job = ({job}) => {

    const selectedIndustry = industryjobs.find((industry) => industry.IndustryName === job);
  
   
    return (
        <main className={styles.main}>
        <Navigation/>

        <div>
            
            <div className={styles.listofjobs}>
            <h1> {job}</h1>
            
            {
               selectedIndustry.jobs.map((job, index) => {
                return  ( <JobItem key={index} jobitem={job}></JobItem> )
               })

            }
            </div>
            <nav>
              balls
            </nav>
        </div>
            
        </main>
    );
}

export default Job;
