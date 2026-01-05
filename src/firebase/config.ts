import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Fixed Firebase configuration untuk project fifaworldcup2026
const firebaseConfig = {
  apiKey: "AIzaSyDF9eKg0zSYbq57Z6RS4PBHk7dL9M2E_Ok",
  authDomain: "fifaworldcup2026-e7aaa.firebaseapp.com",
  projectId: "fifaworldcup2026-e7aaa",
  storageBucket: "fifaworldcup2026-e7aaa.firebasestorage.app",
  messagingSenderId: "605078788566",
  appId: "1:605078788566:web:83da759694fcd7d1112c77",
  measurementId: "G-YGZ9FGK0W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
