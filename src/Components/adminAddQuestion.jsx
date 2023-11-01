import React from 'react';
import styles from '@/styles/admin.module.scss';
import { useAuth } from "../../context/AuthContext";

const AdminAddQuestion = ({selectedJob, selectedIndustry}) => {
  const { addQuestionDB } = useAuth();

    const handleAddQuestion = async (e) => {

      e.preventDefault();
      const questionInput = e.target[0].value;
   
        if (questionInput == "") {
          alert("Please write a question first.");
          return;
        }
        try {
          addQuestionDB(selectedIndustry, selectedJob, questionInput);
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
