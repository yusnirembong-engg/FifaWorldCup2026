import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };
  return <section className="py-20 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-wc-darker z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-wc-red/20 to-wc-darker z-0"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-wc-red/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-wc-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center p-3 bg-wc-red/20 rounded-full mb-6">
            <Mail className="w-8 h-8 text-wc-red" />
          </div>

          <h2 className="font-display text-5xl md:text-6xl text-white mb-4 tracking-tight">
            NEVER MISS A <span className="text-wc-red">GOAL</span>
          </h2>

          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
            Join 2M+ fans getting the latest World Cup news, ticket alerts, and
            exclusive match analysis straight to their inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" className="flex-1 bg-slate-900/80 border border-slate-600 text-white px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-wc-red focus:border-transparent placeholder-slate-500" required />
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} type="submit" className={`px-8 py-4 rounded-lg font-bold text-white transition-all shadow-lg ${status === 'success' ? 'bg-wc-green' : 'bg-wc-red hover:bg-wc-redHover shadow-red-900/30'}`}>
              {status === 'success' ? <span className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" /> Subscribed
                </span> : 'Subscribe Now'}
            </motion.button>
          </form>

          <p className="text-slate-500 text-xs mt-6">
            By subscribing, you agree to our Privacy Policy. Unsubscribe at any
            time.
          </p>
        </motion.div>
      </div>
    </section>;
}