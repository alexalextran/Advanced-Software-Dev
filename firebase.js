// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcuTc3or4R-TOw4BuduS2hmFAganK7Bck",
  authDomain: "claricchat.firebaseapp.com",
  projectId: "claricchat",
  storageBucket: "claricchat.appspot.com",
  messagingSenderId: "432813491994",
  appId: "1:432813491994:web:b29a229c5b0b6f9a1d4ea3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};
export const auth = getAuth()