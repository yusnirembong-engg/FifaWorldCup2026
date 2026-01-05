import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

// Safe environment variable check
const isFirebaseConfigured = (): boolean => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      const apiKey = import.meta.env.VITE_FIREBASE_API_KEY as string;
      return apiKey && apiKey !== 'demo-key';
    }
    return false;
  } catch {
    return false;
  }
};
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock auth state for demo purposes if Firebase isn't configured
  const [isMockAuthenticated, setIsMockAuthenticated] = useState(false);
  useEffect(() => {
    try {
      if (isFirebaseConfigured()) {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
          setUser(currentUser);
          setLoading(false);
        });
        return unsubscribe;
      } else {
        // Mock mode
        const storedAuth = localStorage.getItem('mockAuth');
        if (storedAuth === 'true') {
          setIsMockAuthenticated(true);
          // Create a fake user object
          setUser({
            email: 'admin@fifa2026.com',
            uid: 'mock-admin'
          } as User);
        }
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  }, []);
  const login = async (email: string, pass: string) => {
    setError(null);
    try {
      if (isFirebaseConfigured()) {
        await signInWithEmailAndPassword(auth, email, pass);
      } else {
        // Mock login
        if (email === 'admin@fifa2026.com' && pass === 'password') {
          setIsMockAuthenticated(true);
          setUser({
            email: 'admin@fifa2026.com',
            uid: 'mock-admin'
          } as User);
          localStorage.setItem('mockAuth', 'true');
        } else {
          throw new Error('Invalid credentials (Try: admin@fifa2026.com / password)');
        }
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };
  const logout = async () => {
    try {
      if (isFirebaseConfigured()) {
        await signOut(auth);
      } else {
        setIsMockAuthenticated(false);
        setUser(null);
        localStorage.removeItem('mockAuth');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };
  return {
    user,
    loading,
    error,
    login,
    logout
  };
}