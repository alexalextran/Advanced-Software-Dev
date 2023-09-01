import React, { useEffect, useState } from 'react';
import industryQuestions from  '../../public/data/industryQuestions.js'
import Question from '@/Components/question.jsx';
import styles from '@/styles/JobItem.module.scss'


const JobItem = ({jobitem}) => {
    const [showQuestions, setshowQuestions] = useState(false)

 
    

    var QuestionArray = industryQuestions.find((question) => question.Name === jobitem);

    
    return (
        <div className={styles.job} onClick={() => {setshowQuestions(!showQuestions)}}>
            {jobitem}
            {
              showQuestions ?  QuestionArray.Questions.map((question, index) => {
                    return <Question key={index} question={question}> </Question>
                })
                : <p></p>
            }
        </div>
    );
}

export default JobItem;
