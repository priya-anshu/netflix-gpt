// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYbU6ihpNwozg1IVMbsYuXluglstJ9OGY",
  authDomain: "netflix-gpt-3c343.firebaseapp.com",
  projectId: "netflix-gpt-3c343",
  storageBucket: "netflix-gpt-3c343.appspot.com", // FIXED
  messagingSenderId: "886911658795",
  appId: "1:886911658795:web:ac4a7dab0af175b9f8336e",
  measurementId: "G-8B8RRBD271"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export auth
export default app;
