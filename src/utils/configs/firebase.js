// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVwy2oVeBcokR0r9Q1e5n9FmUYMgwMa3g",
  authDomain: "blockbuster-ccbfb.firebaseapp.com",
  projectId: "blockbuster-ccbfb",
  storageBucket: "blockbuster-ccbfb.firebasestorage.app",
  messagingSenderId: "304359002727",
  appId: "1:304359002727:web:efea7cbe868c671795bac2",
  measurementId: "G-VL4LL82RWL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
