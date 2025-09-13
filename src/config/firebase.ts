import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase config - replace with your actual config
const firebaseConfig = {
    apiKey: "AIzaSyCt0XjOab1DlZnQ-4sTv7wmL3EuTx5djZE",
    authDomain: "amogaaspices-f1c7f.firebaseapp.com",
    projectId: "amogaaspices-f1c7f",
    storageBucket: "amogaaspices-f1c7f.firebasestorage.app",
    messagingSenderId: "950540407571",
    appId: "1:950540407571:web:84be19ff965b83d6bd40e6",
    measurementId: "G-XKBP13JWCF"
  };

console.log('Firebase config:', firebaseConfig);

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
console.log('Firebase auth initialized:', auth);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
console.log('Firebase Firestore initialized:', db);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);
console.log('Firebase Storage initialized:', storage);

export default app;
