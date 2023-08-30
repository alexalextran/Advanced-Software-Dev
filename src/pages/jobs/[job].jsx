import React from 'react';
import industries from  '../../../public/data/industryData.js'


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
    console.log(job)
    return (
        <div>
            nice
            {job}
        </div>
    );
}

export default Job;
