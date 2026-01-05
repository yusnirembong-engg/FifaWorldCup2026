import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';
export function NewsTicker() {
  const {
    news
  } = useFirebase();
  // Create ticker items from news headlines
  const newsItems = news.map(article => article.title);
  // Fallback if no news
  const displayItems = newsItems.length > 0 ? [...newsItems, ...newsItems, ...newsItems] : ['Welcome to the Official FIFA World Cup 2026 News Portal', 'Breaking News: Match Schedule Announced'];
  return <div className="bg-wc-red text-white py-3 overflow-hidden border-b-4 border-wc-darker relative z-20">
      <div className="flex items-center whitespace-nowrap">
        <div className="bg-wc-red px-4 z-10 flex items-center font-bold text-sm uppercase tracking-wider shadow-[10px_0_20px_rgba(220,38,38,1)]">
          <span className="animate-pulse mr-2 bg-white text-wc-red px-2 py-0.5 rounded text-xs">
            LIVE
          </span>
          Breaking News
        </div>

        <motion.div className="flex items-center" animate={{
        x: [0, -1000]
      }} transition={{
        repeat: Infinity,
        duration: 30,
        ease: 'linear'
      }}>
          {displayItems.map((item, index) => <div key={index} className="flex items-center mx-6">
              <Zap className="w-4 h-4 text-yellow-300 mr-2 fill-yellow-300" />
              <span className="font-medium text-sm md:text-base">{item}</span>
            </div>)}
        </motion.div>
      </div>
    </div>;
}