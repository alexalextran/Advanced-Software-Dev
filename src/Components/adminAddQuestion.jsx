import React from 'react';
import {
  doc,
  updateDoc,
  getDoc
  } from "firebase/firestore";
const AdminAddQuestion = ({setJobsForSelectedIndustryJob,  jobsForSelectedIndustryJob, question, setQuestion, selectedJob, db, selectedIndustryJob, questions}) => {

    const handleAddQuestion = async () => {
        if (!selectedJob) {
          alert("Please select a job first.");
          return;
        }
      
        if (!question) {
          alert("Please enter a question.");
          return;
        }
      
        try {
          const jobDocumentRef = doc(db, 'industryJobs', selectedIndustryJob, 'jobs', selectedJob);
   
          // Fetch the existing questions from the database
          const jobDocSnapshot = await getDoc(jobDocumentRef);
          const jobData = jobDocSnapshot.data();
          const existingQuestions = jobData.Questions || [];
      
          // Update the questions array with the new question and existing questions
          const updatedQuestions = [...existingQuestions, question];
           
          // Update the questions array for the selected job in Firestore using updateDoc
          await updateDoc(jobDocumentRef, {
            Questions: updatedQuestions,
          });
      
          // Update the local state with the new questions added
          const updatedJobsForSelectedIndustryJob = jobsForSelectedIndustryJob.map((job) => {
            if (job.Name === selectedJob) {
              return {
                ...job,
                Questions: updatedQuestions,
              };
            }
            return job;
          });
          setJobsForSelectedIndustryJob(updatedJobsForSelectedIndustryJob);
          setQuestion('');
        } catch (error) {
          console.error('Error adding question:', error);
        }
      };



    return (
        <div>
          <label htmlFor="newQuestion">Add a New Question:</label>
          <input
            type="text"
            id="newQuestion"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="button" onClick={handleAddQuestion}>Add Question</button>
        </div>
    );
}

export default AdminAddQuestion;
