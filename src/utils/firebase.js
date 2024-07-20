// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXFPi7uflo3Vo4OUUbQH5xSORsM_y16V4",
  authDomain: "netflixgpt-newer.firebaseapp.com",
  projectId: "netflixgpt-newer",
  storageBucket: "netflixgpt-newer.appspot.com",
  messagingSenderId: "671989970989",
  appId: "1:671989970989:web:dbdde4a77f3ca0ea7da0a4",
  measurementId: "G-898ECJLWTR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
