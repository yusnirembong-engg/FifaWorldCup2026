import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Ticket } from 'lucide-react';
export function Hero() {
  return <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop" alt="Stadium Atmosphere" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-wc-darker via-wc-darker/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-wc-darker via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="flex items-center space-x-4 mb-6">
            <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
              Official News Portal
            </span>
            <span className="text-wc-green font-bold flex items-center animate-pulse">
              <span className="w-2 h-2 bg-wc-green rounded-full mr-2"></span>
              Countdown to Kickoff
            </span>
          </motion.div>

          <motion.h1 initial={{
          opacity: 0,
          x: -30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="font-display text-7xl md:text-9xl text-white leading-[0.85] mb-6">
            FIFA WORLD CUP <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wc-red to-orange-500">
              2026
            </span>
          </motion.h1>

          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="text-xl md:text-2xl text-slate-300 mb-8 font-light tracking-wide border-l-4 border-wc-green pl-6">
            USA • CANADA • MEXICO
            <span className="block text-slate-400 text-lg mt-2 font-normal">
              Experience the biggest sporting event in history across three
              nations.
            </span>
          </motion.p>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="flex flex-col sm:flex-row gap-4">
            <button className="group bg-wc-red hover:bg-wc-redHover text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] flex items-center justify-center">
              <Ticket className="w-5 h-5 mr-2" />
              Get Tickets
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center">
              View Host Cities
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-t from-wc-red/20 to-transparent blur-3xl pointer-events-none" />
    </section>;
}