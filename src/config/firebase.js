// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyMXBBb8Po4NuHJ1uTS0kY18s3ljKh8k0",
  authDomain: "vendingapp-83eb9.firebaseapp.com",
  databaseURL: "https://vendingapp-83eb9-default-rtdb.firebaseio.com",
  projectId: "vendingapp-83eb9",
  storageBucket: "vendingapp-83eb9.appspot.com",
  messagingSenderId: "158578096083",
  appId: "1:158578096083:web:01d5e7ef2a60d767a46126",
  measurementId: "G-SQF21SZHC3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

export default app;
