import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Filter, ExternalLink, Trophy, Wifi, RefreshCw } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';
export function ActivityPage() {
  const {
    matches,
    apiLoading,
    apiError,
    refreshApiData
  } = useFirebase();
  const [filter, setFilter] = useState<'all' | 'group' | 'knockout' | 'live'>('all');
  const filteredMatches = matches.filter(match => {
    if (filter === 'all') return true;
    if (filter === 'live') return match.isLive;
    if (filter === 'group') return match.stage === 'GROUP_STAGE' || match.group?.includes('Group');
    if (filter === 'knockout') return match.stage !== 'GROUP_STAGE' && !match.group?.includes('Group');
    return true;
  });
  return <div className="min-h-screen bg-wc-darker text-white pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="font-display text-6xl md:text-7xl mb-4">
              Match <span className="text-wc-red">Schedule</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl">
              Follow every moment of the 2026 World Cup. Live scores, upcoming
              fixtures, and match details.
            </p>
            {apiLoading && <div className="mt-4 flex items-center text-wc-green text-sm">
                <Wifi className="w-4 h-4 mr-2 animate-pulse" />
                Fetching latest match data...
              </div>}
          </div>
          <button onClick={() => refreshApiData()} disabled={apiLoading} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-bold flex items-center transition-colors disabled:opacity-50">
            <RefreshCw className={`w-4 h-4 mr-2 ${apiLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* API Error */}
        {apiError && <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-8">
            <p className="text-red-400 font-bold">API Error: {apiError}</p>
            <p className="text-slate-400 text-sm mt-1">
              Check your API key in the Admin panel.
            </p>
          </div>}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button onClick={() => setFilter('all')} className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${filter === 'all' ? 'bg-wc-red text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
            All Matches ({matches.length})
          </button>
          <button onClick={() => setFilter('live')} className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${filter === 'live' ? 'bg-wc-red text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
            Live Now ({matches.filter(m => m.isLive).length})
          </button>
          <button onClick={() => setFilter('group')} className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${filter === 'group' ? 'bg-wc-red text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
            Group Stage
          </button>
          <button onClick={() => setFilter('knockout')} className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${filter === 'knockout' ? 'bg-wc-red text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
            Knockout Stage
          </button>
        </div>

        {/* Matches Grid */}
        <div className="space-y-4">
          {filteredMatches.map((match, idx) => <motion.div key={match.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: idx * 0.05
        }} className="bg-wc-card border border-slate-700 rounded-xl p-6 hover:border-wc-green transition-colors group relative overflow-hidden">
              {match.isLive && <div className="absolute top-0 right-0 bg-wc-red text-white text-xs font-bold px-3 py-1 rounded-bl-lg animate-pulse flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  LIVE NOW
                </div>}

              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Time & Venue */}
                <div className="flex flex-col items-center lg:items-start min-w-[200px]">
                  <div className="flex items-center text-wc-green font-bold mb-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    {match.date}
                  </div>
                  <div className="text-2xl font-display text-white mb-2">
                    {match.time}
                  </div>
                  <div className="flex items-center text-slate-400 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {match.venue}
                  </div>
                  <div className="mt-2 text-xs font-bold text-slate-500 bg-slate-900 px-2 py-1 rounded uppercase tracking-widest">
                    {match.group}
                  </div>
                </div>

                {/* Teams & Score */}
                <div className="flex-1 flex items-center justify-center gap-8 md:gap-16">
                  <div className="text-center w-32">
                    <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                      {match.flag1}
                    </div>
                    <div className="font-bold text-lg">{match.team1}</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-5xl font-display font-bold bg-slate-900 px-6 py-2 rounded-lg tracking-widest border border-slate-800">
                      {match.homeScore} - {match.awayScore}
                    </div>
                    {match.isLive && <span className="text-wc-green text-sm font-bold mt-2 animate-pulse">
                        Playing
                      </span>}
                  </div>

                  <div className="text-center w-32">
                    <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                      {match.flag2}
                    </div>
                    <div className="font-bold text-lg">{match.team2}</div>
                  </div>
                </div>

                {/* Action */}
                <div className="w-full lg:w-auto flex justify-center">
                  <a href={match.customUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-wc-darker hover:bg-wc-green hover:text-white px-6 py-3 rounded-lg font-bold flex items-center transition-all shadow-lg shadow-white/5 hover:shadow-green-500/20">
                    View Details
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </motion.div>)}

          {filteredMatches.length === 0 && <div className="text-center py-20 text-slate-500">
              <Trophy className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-xl">No matches found for this filter.</p>
            </div>}
        </div>
      </div>
    </div>;
}