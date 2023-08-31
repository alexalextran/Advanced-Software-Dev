import React from 'react';
import industries from  '../../../public/data/industryData.js'
import Navigation from '../navigation.js';
import styles from '@/styles/job.module.scss'

export const getStaticPaths = () => {
    //generates all possible routes and links for every project
        const paths = industries.map(industry => {
            return{
                params: {job: industry.name.toString()}
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
   
    return (
        <main className={styles.main}>
        <Navigation/>

        <div>
            <div className={styles.listofjobs}>
            <h1> {job}</h1>
            </div>
            <nav>
              balls
            </nav>
        </div>
            
        </main>
    );
}

export default Job;
