import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyApQPguHhKj5pZbWKFRYC1QDZ7qkIAlhiQ",
  authDomain: "rtk-new-ecommerce-projects.firebaseapp.com",
  projectId: "rtk-new-ecommerce-projects",
  storageBucket: "rtk-new-ecommerce-projects.firebasestorage.app",
  messagingSenderId: "825618903042",
  appId: "1:825618903042:web:e6b8c1974a2fd30927371b"
};


const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth(app)