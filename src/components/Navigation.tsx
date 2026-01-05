import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Activity',
    path: '/activity'
  }, {
    name: 'Community',
    path: '/community'
  }, {
    name: 'Admin',
    path: '/admin'
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-wc-darker/90 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <Globe className="w-8 h-8 text-wc-green group-hover:rotate-180 transition-transform duration-700" />
          <span className="font-display text-3xl font-bold tracking-wide text-white">
            FIFA <span className="text-wc-red">2026</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-bold text-sm uppercase tracking-wider">
          {navLinks.map(link => <Link key={link.path} to={link.path} className={`relative py-2 transition-colors ${isActive(link.path) ? 'text-wc-red' : 'text-white hover:text-wc-red'}`}>
              {link.name}
              {isActive(link.path) && <motion.div layoutId="underline" className="absolute left-0 right-0 bottom-0 h-0.5 bg-wc-red" />}
            </Link>)}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-slate-800 rounded-full transition-colors text-white">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/admin" className="p-2 hover:bg-slate-800 rounded-full transition-colors text-white">
            <User className="w-5 h-5" />
          </Link>
          <button className="md:hidden p-2 hover:bg-slate-800 rounded-full transition-colors text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden bg-wc-darker border-b border-slate-800 overflow-hidden">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map(link => <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`text-lg font-bold uppercase tracking-wider py-2 ${isActive(link.path) ? 'text-wc-red' : 'text-white'}`}>
                  {link.name}
                </Link>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
}