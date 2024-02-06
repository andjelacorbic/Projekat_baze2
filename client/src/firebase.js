// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "novine-projekat.firebaseapp.com",
  projectId: "novine-projekat",
  storageBucket: "novine-projekat.appspot.com",
  messagingSenderId: "1062979844276",
  appId: "1:1062979844276:web:485d5b170c3e6d5049bfe1",
  measurementId: "G-ES4WY72GZP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
