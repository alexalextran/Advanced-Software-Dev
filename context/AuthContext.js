import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../firebase";
import {
  collection,
  addDoc,
  getFirestore,
  setDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, updateEmail } from "firebase/auth";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobsCollection, setJobsCollection] = useState([]);
  const [industryArray, setIndustryArray] = useState([]);
  const [interviewQuestion, setinterviewQuestion] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [history, sethistory] = useState([]);
  const [industrySelected, setindustrySelected] = useState("");
  //console.log(user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const db = getFirestore(app);
  const auth = getAuth();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const updateUserEmail = (email) => {
    updateEmail(auth.currentUser, email)
      .then(() => {
        // Email updated!
      })
      .catch((error) => {
        console.error("Error updating email:", error);
      });
  };

  const addIndustry = async (IndustryName, jobs) => {
    const docRef = await addDoc(collection(db, "industryJobs"), {
      IndustryName: IndustryName,
      jobs: jobs,
    });
    docRef;
  };

  const addQuestionDB = async (
    selectedIndustry,
    selectedJob,
    questionInput
  ) => {
    const jobDocumentRef = doc(
      db,
      "industryJobs",
      selectedIndustry,
      "jobs",
      selectedJob
    );

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
  };

  const addJobDB = async (selectedIndustry, newJob) => {
    await setDoc(doc(db, "industryJobs", selectedIndustry, "jobs", newJob), {
      Name: newJob,
      Questions: [],
    });
  };

  const retrieveJobsData = async (selectedIndustryJobData) => {
    const selectedIndustryID = selectedIndustryJobData;
    const jobsCollectionRef = collection(
      db,
      "industryJobs",
      selectedIndustryID,
      "jobs"
    );
    const jobsSnapshot = await getDocs(jobsCollectionRef);

    const jobsData = jobsSnapshot.docs.map((doc) => ({
      ID: doc.id,
      ...doc.data(),
    }));
    setJobsCollection(jobsData);
  };

  const retrieveAnalytics = async () => {
    const analyticsRef = doc(db, `users/${user.email}`);
    const analyticsSnapshot = await getDoc(analyticsRef);
    setAnalytics(analyticsSnapshot.data());
  };

  const retrieveIndustriesData = async () => {
    const industryJobsRef = collection(db, "industryJobs");
    const snapshot = await getDocs(industryJobsRef);
    const jobsData = snapshot.docs.map((doc) => ({
      ID: doc.id,
      ...doc.data(),
    }));

    setIndustryArray(jobsData);
  };

  const addResponseToFirestore = async (
    userResponse,
    GPTResponse,
    timestamp
  ) => {
    try {
      await setDoc(doc(db, `users/${user.email}/history/${timestamp}`), {
        InterviewQuestion: interviewQuestion,
        userResponse: userResponse,
        GPTResponse: GPTResponse,
      });
      console.log("Document successfully written to Firestore!");
    } catch (error) {
      console.error("Error writing document to Firestore:", error);
    }
  };

  const addAanalyticsDB = async (analytics) => {
    try {
      await setDoc(
        doc(db, `users/${user.email}`),
        {
          analytics: analytics,
        },
        { merge: true }
      );
      console.log("Document successfully written to Firestore!");
    } catch (error) {
      console.error("Error writing document to Firestore:", error);
    }
  };

  const getUserHistory = async () => {
    const userHistoryRef = collection(db, `users/${user.email}/history`);
    const snapshot = await getDocs(userHistoryRef);
    const historyData = snapshot.docs.map((doc) => ({
      ID: doc.id,
      ...doc.data(),
    }));

    sethistory(historyData);
  };

  return (
    <AuthContext.Provider
      value={{
        history,
        getUserHistory,
        user,
        login,
        signup,
        logout,
        addIndustry,
        db,
        updateUserEmail,
        addQuestionDB,
        addJobDB,
        retrieveJobsData,
        jobsCollection,
        retrieveIndustriesData,
        industryArray,
        interviewQuestion,
        setinterviewQuestion,
        addResponseToFirestore,
        addAanalyticsDB,
        retrieveAnalytics,
        analytics,
        setindustrySelected,
        industrySelected,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
