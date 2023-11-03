import React, { useEffect, useState } from "react";
import 'firebase/firestore';
import AdminIndustry from "@/Components/adminIndustry";
import AdminJobDropDown from "@/Components/adminJobDropDown";
import AdminAddQuestion from "@/Components/adminAddQuestion";
import AdminAddJob from "@/Components/adminAddJob";
import AdminLogOn from "@/Components/adminLogOn";
import styles from '@/styles/admin.module.scss';
import Navigation from "./navigation";
import { useAuth } from "../../context/AuthContext";

const Admin = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(''); //chosen industry --> IT
  const [selectedJob, setSelectedJob] = useState(''); //chosen job --> software developer
  const [adminLoggedIn, setadminLoggedIn] = useState(false)

  const { retrieveIndustriesData } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        retrieveIndustriesData();
      } catch (error) {
        console.error('Error fetching industry jobs:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
    <Navigation/>
    {/* navigation bar */}
      {!adminLoggedIn ? (
        <AdminLogOn  setadminLoggedIn={setadminLoggedIn}/> 
       //renders logon component for admin
      ) : (
        
          <div className={styles.main}>
        <div className={styles.mainLeft}>

          <AdminIndustry
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            //renders all the industries, i.e IT, hospitality
          />

            {selectedIndustry && (
            <AdminAddJob
            //renders the job form allows admins to add jobs
              selectedIndustry={selectedIndustry}
            />
          )}
        </div>

          <div className={styles.mainRight}>
          {selectedIndustry && (
            <AdminJobDropDown
            //renders all jobs depending on the industry selected
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
            />
          )}
          {selectedIndustry && selectedJob && (
            //renders the form that allows admins to add question
            <AdminAddQuestion
              selectedJob={selectedJob}
              selectedIndustry={selectedIndustry}
            />
          )}
          </div>
        </div>
      )}
    </>
  );
}
 
   


export default Admin;
