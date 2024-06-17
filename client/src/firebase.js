// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "luxe-realty.firebaseapp.com",
  projectId: "luxe-realty",
  storageBucket: "luxe-realty.appspot.com",
  messagingSenderId: "548531585722",
  appId: "1:548531585722:web:a9a2a998e570b127543883",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
