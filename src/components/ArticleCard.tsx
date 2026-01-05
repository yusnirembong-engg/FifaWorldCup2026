import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MessageSquare } from 'lucide-react';
interface ArticleProps {
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  delay?: number;
}
export function ArticleCard({
  title,
  excerpt,
  category,
  image,
  date,
  readTime,
  delay = 0
}: ArticleProps) {
  return <motion.article initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.5,
    delay
  }} whileHover={{
    y: -8,
    transition: {
      duration: 0.2
    }
  }} className="group bg-wc-card rounded-xl overflow-hidden shadow-lg border border-slate-700 flex flex-col h-full cursor-pointer">
      <div className="relative h-56 overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-wc-red text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-md">
            {category}
          </span>
        </div>
        <motion.img whileHover={{
        scale: 1.05
      }} transition={{
        duration: 0.4
      }} src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-wc-card to-transparent opacity-60" />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-slate-400 text-xs mb-3 space-x-3">
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" /> {date}
          </span>
          <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
          <span>{readTime} read</span>
        </div>

        <h3 className="font-display text-2xl md:text-3xl leading-none mb-3 text-white group-hover:text-wc-red transition-colors">
          {title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
          <div className="flex items-center text-slate-400 text-xs hover:text-white transition-colors">
            <MessageSquare className="w-3 h-3 mr-1" /> 12 Comments
          </div>
          <span className="flex items-center text-wc-green font-bold text-sm group-hover:translate-x-1 transition-transform">
            Read Article <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        </div>
      </div>
    </motion.article>;
}