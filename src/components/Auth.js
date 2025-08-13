// src/services/auth.js (or similar)

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Fixed import path
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Function to sign in with Google
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    // User is signed in! You can now access user.displayName, user.email, etc.
    console.log("Signed in successfully with Google!");
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData ? error.customData.email : null; // The email of the user's account used.
    const credential = GoogleAuthProvider.credentialFromError(error); // The AuthCredential type that was used.
    console.error("Error signing in with Google:", errorMessage, errorCode, email, credential);
    // You might want to display an error message to the user
  }
}

// Function to sign out
export async function signOutUser() {
  try {
    await signOut(auth);
    console.log("Signed out successfully!");
  } catch (error) {
    console.error("Error signing out:", error);
  }
}

export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, (user) => {
    // 'user' will be the User object if signed in, or null if signed out.
    callback(user);
  });
}
