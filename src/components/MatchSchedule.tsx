import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Bell, ArrowRight } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';
import { Link } from 'react-router-dom';
export function MatchSchedule() {
  const {
    matches
  } = useFirebase();
  // Show only first 3 matches on homepage
  const upcomingMatches = matches.slice(0, 3);
  return <section className="py-16 bg-wc-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-2">
              Upcoming Fixtures
            </h2>
            <p className="text-slate-400">Don't miss a moment of the action</p>
          </div>
          <Link to="/activity" className="mt-4 md:mt-0 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-medium transition-colors border border-slate-700 flex items-center">
            Full Schedule
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="space-y-4">
          {upcomingMatches.map((match, idx) => <motion.div key={match.id} initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: idx * 0.1
        }} className="bg-wc-card hover:bg-slate-800 border border-slate-700 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between group transition-colors">
              <div className="flex flex-col md:flex-row items-center w-full md:w-auto mb-4 md:mb-0">
                <div className="flex items-center text-slate-400 text-sm md:mr-8 mb-2 md:mb-0 min-w-[140px]">
                  <Calendar className="w-4 h-4 mr-2 text-wc-red" />
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{match.date}</span>
                    <span>{match.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-6 md:space-x-10 flex-1">
                  <div className="text-center w-24">
                    <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      {match.flag1}
                    </div>
                    <div className="font-bold text-white">{match.team1}</div>
                  </div>

                  <div className="bg-slate-900 px-3 py-1 rounded text-xs font-bold text-slate-500 uppercase tracking-widest">
                    VS
                  </div>

                  <div className="text-center w-24">
                    <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      {match.flag2}
                    </div>
                    <div className="font-bold text-white">{match.team2}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:items-end w-full md:w-auto border-t md:border-t-0 border-slate-700 pt-4 md:pt-0 mt-2 md:mt-0 pl-0 md:pl-8 md:border-l">
                <div className="flex items-center text-slate-400 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1 text-wc-green" />
                  {match.venue}
                </div>
                <a href={match.customUrl} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-wc-green hover:bg-wc-greenHover text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center transition-colors shadow-lg shadow-green-900/20">
                  <Bell className="w-4 h-4 mr-2" />
                  Set Reminder
                </a>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}