import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ActivityPage } from './pages/ActivityPage';
import { CommunityPage } from './pages/CommunityPage';
import { AdminPage } from './pages/AdminPage';
// Layout wrapper to include Navigation on all pages
function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>
      <Navigation />
      {children}
    </>;
}
export function App() {
  return <FirebaseProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Layout>
      </Router>
    </FirebaseProvider>;
}