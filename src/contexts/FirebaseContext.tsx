import React, { useEffect, useState, createContext, useContext } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useFootballData } from '../hooks/useFootballData';
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
// Types
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  link?: string;
}
export interface Match {
  id: string;
  date: string;
  time: string;
  venue: string;
  team1: string;
  flag1: string;
  team2: string;
  flag2: string;
  group: string;
  customUrl: string;
  homeScore: number;
  awayScore: number;
  isLive: boolean;
}
export interface CommunityLink {
  id: string;
  platform: 'Discord' | 'Facebook' | 'WhatsApp' | 'Email' | 'Twitter' | 'Instagram';
  url: string;
  label: string;
}
interface FirebaseContextType {
  news: Article[];
  matches: Match[];
  communityLinks: CommunityLink[];
  loading: boolean;
  apiLoading: boolean;
  apiError: string | null;
  lastApiUpdate: Date | null;
  addArticle: (article: Omit<Article, 'id'>) => Promise<void>;
  updateArticle: (id: string, data: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  addMatch: (match: Omit<Match, 'id'>) => Promise<void>;
  updateMatch: (id: string, data: Partial<Match>) => Promise<void>;
  deleteMatch: (id: string) => Promise<void>;
  updateCommunityLink: (id: string, data: Partial<CommunityLink>) => Promise<void>;
  refreshApiData: () => Promise<void>;
  updateApiKey: (key: string) => void;
  getApiKey: () => string;
}
const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);
// Initial Mock Data for Demo Purposes (in case Firebase isn't connected)
const INITIAL_NEWS: Article[] = [{
  id: '1',
  title: "Brazil's New Generation: Ready to Conquer the World?",
  excerpt: 'An in-depth look at the young talents emerging from the Brazilian league.',
  category: 'Team Analysis',
  image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1931&auto=format&fit=crop',
  date: '2 hours ago',
  readTime: '5 min'
}, {
  id: '2',
  title: 'Stadium Guide: Inside the Iconic Estadio Azteca',
  excerpt: 'The historic venue prepares for its third World Cup.',
  category: 'Venues',
  image: 'https://images.unsplash.com/photo-1516972238977-89271fb2bab8?q=80&w=2070&auto=format&fit=crop',
  date: '5 hours ago',
  readTime: '8 min'
}, {
  id: '3',
  title: 'Tactical Breakdown: How the USA Midfield Dominates',
  excerpt: "Coach Berhalter's new formation is turning heads.",
  category: 'Match Report',
  image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop',
  date: '1 day ago',
  readTime: '6 min'
}];
const INITIAL_COMMUNITY: CommunityLink[] = [{
  id: '1',
  platform: 'Discord',
  url: '#',
  label: 'Join our Server'
}, {
  id: '2',
  platform: 'Facebook',
  url: '#',
  label: 'Follow Page'
}, {
  id: '3',
  platform: 'WhatsApp',
  url: '#',
  label: 'Join Group'
}, {
  id: '4',
  platform: 'Email',
  url: 'mailto:contact@fifa2026.com',
  label: 'Contact Us'
}];
export function FirebaseProvider({
  children
}: {
  children: ReactNode;
}) {
  const [news, setNews] = useState<Article[]>(INITIAL_NEWS);
  const [communityLinks, setCommunityLinks] = useState<CommunityLink[]>(INITIAL_COMMUNITY);
  const [loading, setLoading] = useState(false);
  const [useLocalState, setUseLocalState] = useState(true);
  // Use Football Data API hook
  const {
    matches: apiMatches,
    loading: apiLoading,
    error: apiError,
    lastUpdated: lastApiUpdate,
    refetch: refreshApiData,
    updateApiKey: updateFootballApiKey,
    getApiKey: getFootballApiKey
  } = useFootballData();
  // Merge API matches with any custom local overrides
  const [localMatchOverrides, setLocalMatchOverrides] = useState<Record<string, Partial<Match>>>({});
  const matches = apiMatches.map(apiMatch => ({
    ...apiMatch,
    ...localMatchOverrides[apiMatch.id] // Apply any custom overrides (like custom URLs)
  }));
  // In a real app, we would use useEffect to subscribe to Firestore
  // For this demo, we'll simulate the operations with local state if Firebase fails or isn't configured
  useEffect(() => {
    // Attempt to connect to Firebase, if it fails (e.g. invalid config), fallback to local state
    try {
      if (isFirebaseConfigured()) {
        setUseLocalState(false);
        const newsUnsub = onSnapshot(query(collection(db, 'news'), orderBy('date', 'desc')), snapshot => {
          setNews(snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }) as Article));
        });
        const communityUnsub = onSnapshot(collection(db, 'community'), snapshot => {
          setCommunityLinks(snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }) as CommunityLink));
        });
        return () => {
          newsUnsub();
          communityUnsub();
        };
      }
    } catch (error) {
      console.log('Using local state demo mode');
      setUseLocalState(true);
    }
  }, []);
  // CRUD Operations (Hybrid: Firebase or Local)
  const addArticle = async (article: Omit<Article, 'id'>) => {
    if (!useLocalState) {
      await addDoc(collection(db, 'news'), article);
    } else {
      const newArticle = {
        ...article,
        id: Date.now().toString()
      };
      setNews([newArticle, ...news]);
    }
  };
  const updateArticle = async (id: string, data: Partial<Article>) => {
    if (!useLocalState) {
      await updateDoc(doc(db, 'news', id), data);
    } else {
      setNews(news.map(n => n.id === id ? {
        ...n,
        ...data
      } : n));
    }
  };
  const deleteArticle = async (id: string) => {
    if (!useLocalState) {
      await deleteDoc(doc(db, 'news', id));
    } else {
      setNews(news.filter(n => n.id !== id));
    }
  };
  const addMatch = async (match: Omit<Match, 'id'>) => {
    if (!useLocalState) {
      await addDoc(collection(db, 'matches'), match);
    } else {
      const newMatch = {
        ...match,
        id: Date.now().toString()
      };
      setLocalMatchOverrides(prev => ({
        ...prev,
        [newMatch.id]: newMatch
      }));
    }
  };
  const updateMatch = async (id: string, data: Partial<Match>) => {
    if (!useLocalState) {
      await updateDoc(doc(db, 'matches', id), data);
    } else {
      setLocalMatchOverrides(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          ...data
        }
      }));
    }
  };
  const deleteMatch = async (id: string) => {
    if (!useLocalState) {
      await deleteDoc(doc(db, 'matches', id));
    } else {
      setLocalMatchOverrides(prev => {
        const newOverrides = {
          ...prev
        };
        delete newOverrides[id];
        return newOverrides;
      });
    }
  };
  const updateCommunityLink = async (id: string, data: Partial<CommunityLink>) => {
    if (!useLocalState) {
      await updateDoc(doc(db, 'community', id), data);
    } else {
      setCommunityLinks(communityLinks.map(l => l.id === id ? {
        ...l,
        ...data
      } : l));
    }
  };
  const updateApiKey = (key: string) => {
    updateFootballApiKey(key);
  };
  const getApiKey = () => {
    return getFootballApiKey();
  };
  return <FirebaseContext.Provider value={{
    news,
    matches,
    communityLinks,
    loading,
    apiLoading,
    apiError,
    lastApiUpdate,
    addArticle,
    updateArticle,
    deleteArticle,
    addMatch,
    updateMatch,
    deleteMatch,
    updateCommunityLink,
    refreshApiData,
    updateApiKey,
    getApiKey
  }}>
      {children}
    </FirebaseContext.Provider>;
}
export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}