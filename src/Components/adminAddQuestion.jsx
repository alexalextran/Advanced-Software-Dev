import React from 'react';
import {
  doc,
  updateDoc,
  getDoc
  } from "firebase/firestore";
import styles from '@/styles/admin.module.scss';

const AdminAddQuestion = ({setJobsArray,  jobsArray, question, selectedJob, db, selectedIndustry}) => {

    const handleAddQuestion = async (e) => {
      e.preventDefault();
      const questionInput = e.target[0].value;
   
        if (!selectedJob) {
          alert("Please select a job first.");
          return;
        }
      
      
        try {
          const jobDocumentRef = doc(db, 'industryJobs', selectedIndustry, 'jobs', selectedJob);
   
          // Fetch the existing questions from the database
          const jobDocSnapshot = await getDoc(jobDocumentRef);
          const jobData = jobDocSnapshot.data();
          const existingQuestions = jobData.Questions || [];
      
          // Update the questions array with the new question and existing questions
          const updatedQuestions = [...existingQuestions, questionInput];
           
          // Update the questions array for the selected job in Firestore using updateDoc
          await updateDoc(jobDocumentRef, {
            Questions: updatedQuestions,
          });
      
          // Update the local state with the new questions added
          const updatedjobsArray = jobsArray.map((job) => {
            if (job.Name === selectedJob) {
              return {
                ...job,
                Questions: updatedQuestions,
              };
            }
            return job;
          });
          setJobsArray(updatedjobsArray);
          window.alert('Question added successfully!');
        } catch (error) {
          console.error('Error adding question:', error);
        }
      };



    return (
        <div >
          <form  onSubmit={handleAddQuestion} className={styles.addQuestion}>
          <label htmlFor="newQuestion">Add a New Question:</label>
          <input
            type="text"
            id="newQuestion"
          />
          <button type="submit">Add Question</button>
          </form>
        </div>
    );
}

export default AdminAddQuestion;
