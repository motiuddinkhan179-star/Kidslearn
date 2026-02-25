'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { Sparkles, BookOpen } from 'lucide-react';

interface SimplifiedContentProps {
  content: string;
}

export const SimplifiedContent: React.FC<SimplifiedContentProps> = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto mt-12 mb-20"
    >
      <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border-t-8 border-[#FFB84D] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-[#FFB84D]/20">
          <Sparkles className="w-12 h-12" />
        </div>
        <div className="absolute bottom-4 left-4 text-[#FFB84D]/20">
          <BookOpen className="w-12 h-12" />
        </div>

        <div className="prose prose-stone max-w-none font-kids">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl md:text-5xl font-bold text-[#4A3728] mb-8 text-center leading-tight">
                  {children}
                </h1>
              ),
              p: ({ children }) => (
                <p className="text-xl md:text-2xl text-[#5D4A3A] leading-relaxed mb-6">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-4 mb-6 text-lg md:text-xl text-[#5D4A3A]">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="ml-4">{children}</li>
              ),
              strong: ({ children }) => (
                <span className="font-bold text-[#FFB84D]">{children}</span>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => window.print()}
            className="px-8 py-3 bg-[#E6F4EA] text-[#34A853] rounded-full font-bold hover:bg-[#CEEAD6] transition-colors flex items-center gap-2"
          >
            🖨️ Print this story
          </button>
        </div>
      </div>
    </motion.div>
  );
};
