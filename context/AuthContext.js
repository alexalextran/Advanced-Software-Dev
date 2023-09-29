import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, app } from '../firebase'
import { collection, addDoc, getFirestore, setDoc, deleteDoc, doc, getDocs, updateDoc, query, where, collectionGroup  } from "firebase/firestore";  


const AuthContext = createContext({})
export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
 

//console.log(user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const db = getFirestore(app);


  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  const addIndustry =  async (IndustryName, jobs) => {

    const docRef = await addDoc(collection(db, "industryJobs"), {
      IndustryName: IndustryName,
      jobs: jobs
    });
    docRef

  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, addIndustry, db}}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}