import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { NewsTicker } from '../components/NewsTicker';
import { LiveScores } from '../components/LiveScores';
import { ArticleCard } from '../components/ArticleCard';
import { MatchSchedule } from '../components/MatchSchedule';
import { Newsletter } from '../components/Newsletter';
import { Globe, Menu, Search, User } from 'lucide-react';
const FEATURED_ARTICLES = [{
  title: "Brazil's New Generation: Ready to Conquer the World?",
  excerpt: 'An in-depth look at the young talents emerging from the Brazilian league who are set to take the 2026 World Cup by storm.',
  category: 'Team Analysis',
  image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1931&auto=format&fit=crop',
  date: '2 hours ago',
  readTime: '5 min'
}, {
  title: 'Stadium Guide: Inside the Iconic Estadio Azteca',
  excerpt: 'The historic venue prepares for its third World Cup. See the renovations and what fans can expect in Mexico City.',
  category: 'Venues',
  image: 'https://images.unsplash.com/photo-1516972238977-89271fb2bab8?q=80&w=2070&auto=format&fit=crop',
  date: '5 hours ago',
  readTime: '8 min'
}, {
  title: 'Tactical Breakdown: How the USA Midfield Dominates',
  excerpt: "Coach Berhalter's new formation is turning heads. We analyze the stats behind the Americans' recent success.",
  category: 'Match Report',
  image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop',
  date: '1 day ago',
  readTime: '6 min'
}];
export function WorldCupPortal() {
  return <div className="min-h-screen bg-wc-darker text-white font-sans selection:bg-wc-red selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-wc-darker/90 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-wc-green" />
            <span className="font-display text-3xl font-bold tracking-wide">
              FIFA <span className="text-wc-red">2026</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 font-bold text-sm uppercase tracking-wider">
            <a href="#" className="text-white hover:text-wc-red transition-colors">
              Matches
            </a>
            <a href="#" className="text-white hover:text-wc-red transition-colors">
              Teams
            </a>
            <a href="#" className="text-white hover:text-wc-red transition-colors">
              Venues
            </a>
            <a href="#" className="text-white hover:text-wc-red transition-colors">
              News
            </a>
            <a href="#" className="text-white hover:text-wc-red transition-colors">
              Shop
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="md:hidden p-2 hover:bg-slate-800 rounded-full transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
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
              <a href="#" className="hidden md:block text-slate-400 hover:text-white font-bold transition-colors border-b border-transparent hover:border-white pb-1">
                View All News
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURED_ARTICLES.map((article, idx) => <ArticleCard key={idx} {...article} delay={idx * 0.2} />)}
            </div>

            <div className="mt-12 text-center md:hidden">
              <button className="bg-slate-800 text-white px-6 py-3 rounded-lg font-bold w-full">
                View All News
              </button>
            </div>
          </div>
        </section>

        <MatchSchedule />
        <Newsletter />
      </main>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Globe className="w-8 h-8 text-wc-green" />
                <span className="font-display text-3xl font-bold tracking-wide">
                  FIFA <span className="text-wc-red">2026</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                The official news portal for the 2026 FIFA World Cup. Bringing
                you closer to the game with real-time updates, exclusive
                content, and match analysis.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider">
                Tournament
              </h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-wc-red transition-colors">
                    Match Schedule
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-wc-red transition-colors">
                    Groups
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-wc-red transition-colors">
                    Teams
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-wc-red transition-colors">
                    Venues
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-wc-red transition-colors">
                    Ticketing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider">
                Fan Zone
              </h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-wc-red transition-colors">
                    Fan Festival
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-wc-red transition-colors">
                    Play Games
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-wc-red transition-colors">
                    Fantasy League
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-wc-red transition-colors">
                    Official Store
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-wc-red transition-colors">
                    Hospitality
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider">
                Follow Us
              </h4>
              <div className="flex space-x-4 mb-6">
                {['Twitter', 'Instagram', 'Facebook', 'YouTube'].map(social => <a key={social} href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:bg-wc-red hover:text-white transition-all">
                      <span className="sr-only">{social}</span>
                      <div className="w-4 h-4 bg-current rounded-sm"></div>
                    </a>)}
              </div>
              <div className="text-slate-500 text-xs">
                &copy; 2026 FIFA World Cup. All rights reserved.
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="hover:text-slate-400">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-400">
                Terms of Service
              </a>
              <a href="#" className="hover:text-slate-400">
                Cookie Settings
              </a>
            </div>
            <p>Designed for the fans.</p>
          </div>
        </div>
      </footer>
    </div>;
}