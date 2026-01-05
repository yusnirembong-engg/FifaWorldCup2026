import React from 'react';
import { motion } from 'framer-motion';
import { Play, Wifi } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';
import { Link } from 'react-router-dom';
export function LiveScores() {
  const {
    matches,
    apiLoading
  } = useFirebase();
  // Prioritize live matches, then recent/upcoming, show max 4
  const sortedMatches = [...matches].sort((a, b) => {
    if (a.isLive && !b.isLive) return -1;
    if (!a.isLive && b.isLive) return 1;
    return 0;
  });
  const displayMatches = sortedMatches.slice(0, 4);
  return <section className="py-8 bg-wc-darker border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-3xl text-white flex items-center">
            <span className="w-2 h-8 bg-wc-green mr-3 rounded-sm"></span>
            Match Center
            {apiLoading && <span className="ml-3 text-sm text-slate-500 flex items-center">
                <Wifi className="w-4 h-4 mr-1 animate-pulse" />
                Updating...
              </span>}
          </h2>
          <Link to="/activity" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center">
            View All Matches <Play className="w-3 h-3 ml-1 fill-current" />
          </Link>
        </div>

        {displayMatches.length === 0 ? <div className="text-center py-12 text-slate-500">
            <p>No matches available. Check API settings in Admin panel.</p>
          </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayMatches.map((match, idx) => <motion.div key={match.id} initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: idx * 0.1
        }} whileHover={{
          y: -4
        }} className="bg-wc-card rounded-lg p-4 border border-slate-700 relative overflow-hidden group cursor-pointer">
                {match.isLive && <div className="absolute top-0 right-0">
                    <div className="bg-wc-red text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse mr-1"></span>
                      LIVE
                    </div>
                  </div>}

                <div className="flex justify-between items-center mb-2 mt-2">
                  <div className="text-center w-1/3">
                    <div className="text-3xl mb-1">{match.flag1}</div>
                    <div className="font-bold text-sm text-slate-300 truncate">
                      {match.team1}
                    </div>
                  </div>

                  <div className="text-center w-1/3">
                    <div className="font-display text-3xl font-bold text-white tracking-widest bg-slate-800/50 rounded px-2 py-1">
                      {match.homeScore}-{match.awayScore}
                    </div>
                    <div className={`text-xs font-medium mt-1 ${match.isLive ? 'text-wc-green' : 'text-slate-500'}`}>
                      {match.isLive ? 'LIVE' : match.time}
                    </div>
                  </div>

                  <div className="text-center w-1/3">
                    <div className="text-3xl mb-1">{match.flag2}</div>
                    <div className="font-bold text-sm text-slate-300 truncate">
                      {match.team2}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-wc-green to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>)}
          </div>}
      </div>
    </section>;
}