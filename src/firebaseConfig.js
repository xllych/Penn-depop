// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAON47QTwAlCwJ0rezSo_jKtq6T09JNLzw",
  authDomain: "penn-marketplace.firebaseapp.com",
  projectId: "penn-marketplace",
  storageBucket: "penn-marketplace.firebasestorage.app",
  messagingSenderId: "1052387859152",
  appId: "1:1052387859152:web:c7a40f3ca5522c04269cd5",
  measurementId: "G-BG4PKE9WLR"
};

// Initialize Firebase

export const analytics = getAnalytics(app);
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);