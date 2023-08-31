import React, { useEffect, useState } from 'react';
import industryQuestions from  '../../public/data/industryQuestions.js'

const JobItem = ({jobitem}) => {
    const [showQuestions, setshowQuestions] = useState(false)

 
    

    var QuestionArray = industryQuestions.find((question) => question.Name === jobitem);

    
    return (
        <button onClick={() => {setshowQuestions(!showQuestions)}}>
            {jobitem}
            {
              showQuestions ?  QuestionArray.Questions.map((question, index) => {
                    return <p key={index}> {question} </p>
                })
                : <p></p>
            }
        </button>
    );
}

export default JobItem;
