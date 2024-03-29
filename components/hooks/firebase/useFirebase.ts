// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_SECRET_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_SECRET_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_SECRET_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_SECRET_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_SECRET_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_SECRET_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_SECRET_FIREBASE_MEASUREMENT_ID || "",
};
// Initialize Firebase
const firebasedb = initializeApp(firebaseConfig);

export const fireStore = getFirestore(firebasedb);
export const storage = getStorage(firebasedb);
export const authService = getAuth(firebasedb);

export default firebasedb;
