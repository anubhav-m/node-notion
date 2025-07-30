// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "node-notion.firebaseapp.com",
  projectId: "node-notion",
  storageBucket: "node-notion.firebasestorage.app",
  messagingSenderId: "934180768549",
  appId: "1:934180768549:web:cc151c80c78663ec4d68cc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);