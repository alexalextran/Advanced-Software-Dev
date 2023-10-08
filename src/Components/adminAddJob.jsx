import React from 'react'; 
import styles from '@/styles/admin.module.scss';
import { useAuth } from "../../context/AuthContext";
const AdminAddJob = ({selectedIndustry}) => {
  const { addJobDB, retrieveJobsData } = useAuth();

    const handleAddJob = async (e) => {
        if (!selectedIndustry) {
          alert("Please select an industry job first.");
          return;
        }
       e.preventDefault();
        const newJob = e.target[0].value;
        try {
          addJobDB(selectedIndustry, newJob)
          retrieveJobsData(selectedIndustry)
          window.alert('Job added successfully!');
        } catch (error) {
          console.error('Error adding job:', error);
        }
      };


    return (
          <form className={styles.addJob} onSubmit={handleAddJob}>
        <label htmlFor="newJob">Add a New Job:</label>
        <input
          type="text"
          id="newJob"
        />
        <button type="submit">Add Job</button>
        </form>
    );
}

export default AdminAddJob;
