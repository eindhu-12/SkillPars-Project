// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, ProviderId } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwgfTN5OVOAwQ0u6ekkASKG9_mXdUAnVE",
  authDomain: "skillpars-58e2c.firebaseapp.com",
  projectId: "skillpars-58e2c",
  storageBucket: "skillpars-58e2c.firebasestorage.app",
  messagingSenderId: "587924583522",
  appId: "1:587924583522:web:c84d7e5eacf3833bffcd3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const Provider=new GoogleAuthProvider  ;
export const db =getFirestore(app);