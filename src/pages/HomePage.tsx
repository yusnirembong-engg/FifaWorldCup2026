import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { NewsTicker } from '../components/NewsTicker';
import { LiveScores } from '../components/LiveScores';
import { ArticleCard } from '../components/ArticleCard';
import { MatchSchedule } from '../components/MatchSchedule';
import { Newsletter } from '../components/Newsletter';
import { useFirebase } from '../contexts/FirebaseContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
export function HomePage() {
  const {
    news
  } = useFirebase();
  // Get top 3 articles for featured section
  const featuredNews = news.slice(0, 3);
  return <div className="min-h-screen bg-wc-darker text-white font-sans selection:bg-wc-red selection:text-white pt-20">
      <NewsTicker />
      <Hero />
      <LiveScores />

      {/* Featured News Section */}
      <section className="py-20 bg-wc-dark">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-wc-red font-bold uppercase tracking-widest text-sm mb-2 block">
                Latest Updates
              </span>
              <h2 className="font-display text-5xl md:text-6xl text-white">
                Featured News
              </h2>
            </div>
            <Link to="/activity" className="hidden md:flex items-center text-slate-400 hover:text-white font-bold transition-colors group">
              View All News
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNews.map((article, idx) => <ArticleCard key={article.id} {...article} delay={idx * 0.2} />)}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/activity" className="bg-slate-800 text-white px-6 py-3 rounded-lg font-bold w-full block">
              View All News
            </Link>
          </div>
        </div>
      </section>

      <MatchSchedule />
      <Newsletter />
    </div>;
}