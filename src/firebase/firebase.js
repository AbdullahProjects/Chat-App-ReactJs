import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqcXkDSsaWawsOiByvej8czsSqADp2svI",
  authDomain: "chat-app-reactjs-ed073.firebaseapp.com",
  projectId: "chat-app-reactjs-ed073",
  storageBucket: "chat-app-reactjs-ed073.firebasestorage.app",
  messagingSenderId: "1052506077643",
  appId: "1:1052506077643:web:d093947b7948144010de4e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};