import React, { useEffect, useState } from "react";
import 'firebase/firestore';
import {
  collection,
  getFirestore,
  getDocs,
} from "firebase/firestore"; 
import styles from '@/styles/adminLogOn.module.scss'

function AdminLogOn({db, setadminLoggedIn}) {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [admins, setadmins] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const adminsRef = collection(db, 'admins');
            const snapshot = await getDocs(adminsRef);
            const adminData = snapshot.docs.map((doc) => ({
              ID: doc.id,
              ...doc.data(),
            }));
            setadmins(adminData);
          } catch (error) {
            console.error('Error fetching industry jobs:', error);
          }
        };
    
        fetchData();
      }, [db]);





  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if there's an admin with the provided email and password
    const adminMatch = admins.find((admin) => admin.email === email && admin.password === password);
  
    if (adminMatch) {
      // Admin found, you can set adminLoggedIn to true here or perform any other action
     
      setadminLoggedIn(true)
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className={styles.main}>
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>

      </form>
    </div>
  );
}

export default AdminLogOn;
