import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFirebase, Article, Match, CommunityLink } from '../contexts/FirebaseContext';
import { Lock, LogOut, Plus, Trash2, Edit2, Save, X, RefreshCw, Key, AlertCircle, CheckCircle } from 'lucide-react';
export function AdminPage() {
  const {
    user,
    login,
    logout,
    loading: authLoading,
    error
  } = useAuth();
  const {
    news,
    matches,
    communityLinks,
    apiLoading,
    apiError,
    lastApiUpdate,
    addArticle,
    deleteArticle,
    updateArticle,
    addMatch,
    deleteMatch,
    updateMatch,
    updateCommunityLink,
    refreshApiData,
    updateApiKey,
    getApiKey
  } = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'news' | 'matches' | 'community' | 'api'>('news');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  // API Key management
  const [showApiKey, setShowApiKey] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');
  const [apiKeySuccess, setApiKeySuccess] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      // Error handled in hook
    }
  };
  if (authLoading) return <div className="min-h-screen bg-wc-darker flex items-center justify-center text-white">
        Loading...
      </div>;
  if (!user) {
    return <div className="min-h-screen bg-wc-darker flex items-center justify-center p-4">
        <div className="bg-wc-card p-8 rounded-2xl border border-slate-700 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-wc-red" />
            </div>
            <h1 className="font-display text-3xl text-white">Admin Access</h1>
            <p className="text-slate-400 mt-2">
              Please login to manage content
            </p>
            <p className="text-xs text-slate-500 mt-4 bg-slate-900 p-2 rounded">
              Demo Login: admin@fifa2026.com / password
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-1">
                Email
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-wc-green" placeholder="admin@fifa2026.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-1">
                Password
              </label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-wc-green" placeholder="••••••••" />
            </div>
            {error && <div className="text-wc-red text-sm font-bold">{error}</div>}
            <button type="submit" className="w-full bg-wc-red hover:bg-wc-redHover text-white font-bold py-3 rounded-lg transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>;
  }
  const handleApiKeyUpdate = () => {
    if (newApiKey.trim()) {
      updateApiKey(newApiKey);
      setApiKeySuccess(true);
      setTimeout(() => setApiKeySuccess(false), 3000);
      setNewApiKey('');
    }
  };
  const handleRefreshMatches = async () => {
    await refreshApiData();
  };
  return <div className="min-h-screen bg-wc-darker text-white pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-4xl">Dashboard</h1>
            {lastApiUpdate && <p className="text-slate-500 text-sm mt-1">
                Last API update: {lastApiUpdate.toLocaleTimeString()}
              </p>}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleRefreshMatches} disabled={apiLoading} className="bg-wc-green hover:bg-wc-greenHover text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-colors disabled:opacity-50">
              <RefreshCw className={`w-4 h-4 mr-2 ${apiLoading ? 'animate-spin' : ''}`} />
              Refresh Matches
            </button>
            <span className="text-slate-400 text-sm hidden md:inline">
              Logged in as {user.email}
            </span>
            <button onClick={() => logout()} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-colors">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* API Error Alert */}
        {apiError && <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-500 mb-1">API Error</h3>
              <p className="text-sm text-slate-300">{apiError}</p>
            </div>
          </div>}

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 border-b border-slate-800 pb-1 overflow-x-auto">
          {(['news', 'matches', 'community', 'api'] as const).map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 font-bold uppercase tracking-wider text-sm rounded-t-lg transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-wc-card text-wc-green border-t border-x border-slate-700' : 'text-slate-500 hover:text-white'}`}>
              {tab === 'api' ? 'API Settings' : tab}
            </button>)}
        </div>

        {/* Content Area */}
        <div className="bg-wc-card border border-slate-700 rounded-xl p-6">
          {/* API SETTINGS TAB */}
          {activeTab === 'api' && <div>
              <h2 className="text-2xl font-bold mb-6">
                Football-Data.org API Settings
              </h2>

              <div className="space-y-6">
                {/* Current API Key */}
                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg flex items-center">
                      <Key className="w-5 h-5 mr-2 text-wc-green" />
                      Current API Key
                    </h3>
                    <button onClick={() => setShowApiKey(!showApiKey)} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {showApiKey ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className="bg-slate-800 p-3 rounded font-mono text-sm">
                    {showApiKey ? getApiKey() : '••••••••••••••••••••••••••••••••'}
                  </div>
                </div>

                {/* Update API Key */}
                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                  <h3 className="font-bold text-lg mb-4">Update API Key</h3>
                  <div className="flex gap-3">
                    <input type="text" value={newApiKey} onChange={e => setNewApiKey(e.target.value)} placeholder="Enter new API key" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-wc-green" />
                    <button onClick={handleApiKeyUpdate} disabled={!newApiKey.trim()} className="bg-wc-green hover:bg-wc-greenHover text-white px-6 py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      Update
                    </button>
                  </div>
                  {apiKeySuccess && <div className="mt-3 flex items-center text-wc-green text-sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      API key updated successfully!
                    </div>}
                </div>

                {/* API Info */}
                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                  <h3 className="font-bold text-lg mb-4">API Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Endpoint:</span>
                      <span className="font-mono text-slate-300">
                        api.football-data.org/v4
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Competition:</span>
                      <span className="text-slate-300">FIFA World Cup</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Auto-refresh:</span>
                      <span className="text-wc-green">
                        Every 60 seconds (live matches)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Update:</span>
                      <span className="text-slate-300">
                        {lastApiUpdate ? lastApiUpdate.toLocaleString() : 'Never'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3 text-blue-400">
                    How to Get an API Key
                  </h3>
                  <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
                    <li>
                      Visit{' '}
                      <a href="https://www.football-data.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        football-data.org
                      </a>
                    </li>
                    <li>Create a free account</li>
                    <li>Navigate to your dashboard</li>
                    <li>Copy your API key</li>
                    <li>Paste it above and click Update</li>
                  </ol>
                </div>
              </div>
            </div>}

          {/* NEWS TAB */}
          {activeTab === 'news' && <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage News</h2>
                <button onClick={() => {
              const article = {
                title: 'New Article',
                excerpt: 'Article summary...',
                category: 'News',
                image: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop',
                date: 'Just now',
                readTime: '3 min'
              };
              addArticle(article);
            }} className="bg-wc-green hover:bg-wc-greenHover text-white px-4 py-2 rounded-lg font-bold flex items-center text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Article
                </button>
              </div>

              <div className="space-y-4">
                {news.map(article => <div key={article.id} className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 flex flex-col md:flex-row gap-4 items-start">
                    <img src={article.image} alt="" className="w-24 h-24 object-cover rounded-lg bg-slate-800" />
                    <div className="flex-1 w-full">
                      {isEditing === article.id ? <div className="space-y-3">
                          <input value={article.title} onChange={e => updateArticle(article.id, {
                    title: e.target.value
                  })} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
                          <textarea value={article.excerpt} onChange={e => updateArticle(article.id, {
                    excerpt: e.target.value
                  })} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm" rows={2} />
                          <div className="flex gap-2">
                            <button onClick={() => setIsEditing(null)} className="bg-wc-green px-3 py-1 rounded text-xs font-bold">
                              Save
                            </button>
                          </div>
                        </div> : <>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg mb-1">
                              {article.title}
                            </h3>
                            <div className="flex space-x-2">
                              <button onClick={() => setIsEditing(article.id)} className="p-1 text-slate-400 hover:text-white">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => deleteArticle(article.id)} className="p-1 text-slate-400 hover:text-wc-red">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-slate-400 text-sm mb-2">
                            {article.excerpt}
                          </p>
                          <div className="flex gap-2 text-xs text-slate-500">
                            <span className="bg-slate-800 px-2 py-1 rounded">
                              {article.category}
                            </span>
                            <span className="bg-slate-800 px-2 py-1 rounded">
                              {article.date}
                            </span>
                          </div>
                        </>}
                    </div>
                  </div>)}
              </div>
            </div>}

          {/* MATCHES TAB */}
          {activeTab === 'matches' && <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Manage Match Links</h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Matches are fetched from API. You can customize the "View
                    Details" URLs.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {matches.map(match => <div key={match.id} className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-center w-16">
                          <div className="text-2xl">{match.flag1}</div>
                          <div className="text-xs font-bold">{match.team1}</div>
                        </div>
                        <div className="font-bold text-xl bg-slate-800 px-3 py-1 rounded">
                          {match.homeScore} - {match.awayScore}
                        </div>
                        <div className="text-center w-16">
                          <div className="text-2xl">{match.flag2}</div>
                          <div className="text-xs font-bold">{match.team2}</div>
                        </div>
                        <div className="flex flex-col text-xs text-slate-400">
                          <span>
                            {match.date} • {match.time}
                          </span>
                          <span>{match.venue}</span>
                          {match.isLive && <span className="text-wc-red font-bold animate-pulse">
                              LIVE
                            </span>}
                        </div>
                      </div>
                      <div className="w-full md:w-auto">
                        {isEditing === match.id ? <div className="flex gap-2">
                            <input value={match.customUrl} onChange={e => updateMatch(match.id, {
                      customUrl: e.target.value
                    })} placeholder="Custom URL" className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm" />
                            <button onClick={() => setIsEditing(null)} className="bg-wc-green px-3 py-2 rounded text-xs font-bold">
                              Save
                            </button>
                          </div> : <button onClick={() => setIsEditing(match.id)} className="text-slate-400 hover:text-white text-sm flex items-center">
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit URL
                          </button>}
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}

          {/* COMMUNITY TAB */}
          {activeTab === 'community' && <div>
              <h2 className="text-2xl font-bold mb-6">
                Manage Community Links
              </h2>
              <div className="space-y-4">
                {communityLinks.map(link => <div key={link.id} className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{link.platform}</h3>
                      {isEditing === link.id ? <input value={link.url} onChange={e => updateCommunityLink(link.id, {
                  url: e.target.value
                })} className="w-full md:w-96 bg-slate-800 border border-slate-700 rounded px-3 py-1 text-white text-sm mt-2" /> : <p className="text-slate-400 text-sm truncate max-w-md">
                          {link.url}
                        </p>}
                    </div>
                    <div>
                      {isEditing === link.id ? <button onClick={() => setIsEditing(null)} className="bg-wc-green px-4 py-2 rounded text-sm font-bold">
                          Save
                        </button> : <button onClick={() => setIsEditing(link.id)} className="text-slate-400 hover:text-white p-2">
                          <Edit2 className="w-5 h-5" />
                        </button>}
                    </div>
                  </div>)}
              </div>
            </div>}
        </div>
      </div>
    </div>;
}