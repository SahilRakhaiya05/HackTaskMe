// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMXyjumL31wjyxarcm-aa7TinNRUahLJM",
  authDomain: "aiva-dash.firebaseapp.com",
  projectId: "aiva-dash",
  storageBucket: "aiva-dash.appspot.com",
  messagingSenderId: "231407350318",
  appId: "1:231407350318:web:f0623ec2424b3d0661e5bf",
  measurementId: "G-V879S6ZF5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
