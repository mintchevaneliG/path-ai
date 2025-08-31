// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqa5BD8JnY5S3WSpo0fv6y9McdAiUm_uI",
  authDomain: "path-ai-5ef3d.firebaseapp.com",
  projectId: "path-ai-5ef3d",
  storageBucket: "path-ai-5ef3d.firebasestorage.app",
  messagingSenderId: "547454563960",
  appId: "1:547454563960:web:1503caca8b53ba9dd5df8d",
  measurementId: "G-K3C2W82TQR"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

const analytics = getAnalytics(app);