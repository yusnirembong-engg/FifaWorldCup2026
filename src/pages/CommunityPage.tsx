import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Facebook, Mail, Users, MessageSquare, Share2 } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';
export function CommunityPage() {
  const {
    communityLinks
  } = useFirebase();
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'Discord':
        return <MessageCircle className="w-8 h-8" />;
      case 'Facebook':
        return <Facebook className="w-8 h-8" />;
      case 'WhatsApp':
        return <MessageSquare className="w-8 h-8" />;
      case 'Email':
        return <Mail className="w-8 h-8" />;
      default:
        return <Share2 className="w-8 h-8" />;
    }
  };
  const getColor = (platform: string) => {
    switch (platform) {
      case 'Discord':
        return 'bg-[#5865F2] hover:bg-[#4752C4]';
      case 'Facebook':
        return 'bg-[#1877F2] hover:bg-[#166FE5]';
      case 'WhatsApp':
        return 'bg-[#25D366] hover:bg-[#20BD5C]';
      case 'Email':
        return 'bg-slate-700 hover:bg-slate-600';
      default:
        return 'bg-wc-red hover:bg-wc-redHover';
    }
  };
  return <div className="min-h-screen bg-wc-darker text-white pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }}>
            <span className="text-wc-green font-bold uppercase tracking-widest text-sm mb-4 block">
              Fan Zone
            </span>
            <h1 className="font-display text-6xl md:text-7xl mb-6">
              Join the <span className="text-wc-red">Community</span>
            </h1>
            <p className="text-slate-400 text-xl">
              Connect with millions of fans worldwide. Discuss matches, share
              predictions, and be part of the global celebration.
            </p>
          </motion.div>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {communityLinks.map((link, idx) => <motion.a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: idx * 0.1
        }} className={`${getColor(link.platform)} p-8 rounded-2xl flex flex-col items-center justify-center text-center group transition-all hover:-translate-y-2 shadow-lg`}>
              <div className="bg-white/20 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                {getIcon(link.platform)}
              </div>
              <h3 className="font-display text-2xl mb-2">{link.platform}</h3>
              <p className="text-white/80 font-medium">{link.label}</p>
            </motion.a>)}
        </div>

        {/* Fan Activities Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-wc-card border border-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-display text-4xl mb-4">Fan Polls</h3>
              <p className="text-slate-400 mb-8">
                Who will win the Golden Boot? Cast your vote and see what the
                community thinks.
              </p>

              <div className="space-y-4">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-wc-green cursor-pointer transition-colors">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">Kylian Mbappé</span>
                    <span className="text-wc-green">45%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-wc-green h-full w-[45%]"></div>
                  </div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-wc-green cursor-pointer transition-colors">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">Vinícius Júnior</span>
                    <span className="text-wc-green">32%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-wc-green h-full w-[32%]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-wc-green/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          </div>

          <div className="bg-wc-card border border-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-display text-4xl mb-4">Discussion Board</h3>
              <p className="text-slate-400 mb-8">
                Hot topics trending in the community right now.
              </p>

              <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">
                        Best stadium atmosphere so far?
                      </h4>
                      <p className="text-sm text-slate-400">
                        Posted by SoccerFan99 • 2h ago
                      </p>
                    </div>
                  </div>)}
              </div>

              <button className="mt-8 w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-bold transition-colors">
                View All Discussions
              </button>
            </div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-wc-red/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>;
}