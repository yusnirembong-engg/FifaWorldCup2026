import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Safe environment variable access that works in all environments
const getEnvVar = (key: string, fallback: string): string => {
  try {
    // Check if import.meta exists (Vite environment)
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] as string || fallback;
    }
    return fallback;
  } catch {
    return fallback;
  }
};

// Replace with your actual Firebase configuration
// For the demo to work without setup, we'll handle missing config gracefully in the context
const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', 'demo-key'),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', 'demo.firebaseapp.com'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', 'demo-project'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', 'demo.appspot.com'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', '123456789'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', '1:123456789:web:abcdef')
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);