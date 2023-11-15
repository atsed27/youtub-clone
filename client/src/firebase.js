// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyA_cUbGHcjycRAy_Pt8RR8sht0dE03COF4',
  authDomain: 'video-83aa0.firebaseapp.com',
  projectId: 'video-83aa0',
  storageBucket: 'video-83aa0.appspot.com',
  messagingSenderId: '992126828936',
  appId: '1:992126828936:web:d8f44a3fd67ea3df6d3a3d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const Provider = new GoogleAuthProvider();
export default app;
