// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCl6sx6ddby3r9L5Z47WKctX2leGO4eDPI",
  authDomain: "emsi-5ae3f.firebaseapp.com",
  projectId: "emsi-5ae3f",
  storageBucket: "emsi-5ae3f.firebasestorage.app",
  messagingSenderId: "597224018382",
  appId: "1:597224018382:web:331950968024e168d25b9f",
  measurementId: "G-YR0EG85S62",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
