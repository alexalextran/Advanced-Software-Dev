import React, { useEffect, useState } from 'react';
import industryQuestions from  '../../public/data/industryQuestions.js'
import QuestionComponent  from '@/Components/question.jsx';
import styles from '@/styles/JobItem.module.scss'


const JobItem = ({jobitem, setquestionInfo}) => {
    const [showQuestions, setshowQuestions] = useState(false)
    var QuestionArray = industryQuestions.find((question) => question.Name === jobitem);

    const handleDivClick = (e) => {
        // Check if the clicked element has the classname styles.jobtitle
        if ((e.target.classList.contains(styles.job))) {
            setshowQuestions(!showQuestions);
       
        }
    }
    
    return (
        <div className={styles.job} onClick={handleDivClick}>
            <h2 className={styles.jobtitle}>{jobitem.ID}</h2>
            {
              showQuestions  ?  jobitem.Questions.map((Question, index) => {
                    return   <QuestionComponent setquestionInfo={setquestionInfo} Question={Question}  key={index} index={index}> </QuestionComponent> 
                })
                : <p></p>
            }
        </div>
    );
}

export default JobItem;
