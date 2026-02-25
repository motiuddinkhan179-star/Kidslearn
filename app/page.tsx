'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PDFUploader } from '@/components/PDFUploader';
import { SimplifiedContent } from '@/components/SimplifiedContent';
import { simplifyContent } from '@/lib/gemini';
import { Sparkles, Baby, BookOpen, Wand2 } from 'lucide-react';

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (base64: string, mimeType: string) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key is missing. Please check your environment variables.');
      }

      const simplified = await simplifyContent(base64, mimeType, apiKey);
      setResult(simplified);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Something went wrong while making the story.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-12 md:py-20 overflow-x-hidden">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#FFB84D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#34A853]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFB84D]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-[#FFB84D] rounded-3xl shadow-lg shadow-[#FFB84D]/30 mb-6"
          >
            <Wand2 className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-kids font-bold text-[#4A3728] mb-4 tracking-tight"
          >
            KiddoPDF
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-[#8B735B] max-w-2xl mx-auto leading-relaxed"
          >
            Puri book ya <span className="text-[#FFB84D] font-bold">Images</span> ko <span className="text-[#FFB84D] font-bold">Hinglish stories</span> mein badlo! 🌈 
            <br />
            <span className="inline-flex items-center gap-2 mt-4 text-sm font-bold bg-[#FFB84D] text-white px-8 py-3 rounded-full uppercase tracking-widest shadow-2xl shadow-[#FFB84D]/40 animate-pulse">
              <Sparkles className="w-5 h-5" />
              Full Content Mirror: No Summaries!
            </span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-base text-[#4A3728] font-bold"
          >
            Har ek page, har ek line, har ek image - Sab kuch detail mein!
          </motion.p>
        </header>

        {/* Features Row */}
        {!result && !isProcessing && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {[
              { icon: <Baby className="w-6 h-6" />, title: "Kid Friendly", desc: "Simple words & fun ideas" },
              { icon: <Sparkles className="w-6 h-6" />, title: "Magical", desc: "Turns data into adventures" },
              { icon: <BookOpen className="w-6 h-6" />, title: "Educational", desc: "Learn while having fun" },
            ].map((feature, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[#E6D5B8] flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#FFF9F0] rounded-full flex items-center justify-center text-[#FFB84D] mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-[#4A3728] mb-1">{feature.title}</h3>
                <p className="text-sm text-[#8B735B]">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Upload Section */}
        <section>
          <PDFUploader onUpload={handleUpload} isProcessing={isProcessing} />
        </section>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-[#FFF0F0] border-2 border-[#FF4D4D] rounded-2xl text-[#FF4D4D] text-center font-bold"
          >
            Oops! {error}
          </motion.div>
        )}

        {/* Result Section */}
        {result && <SimplifiedContent content={result} />}

        {/* Footer */}
        <footer className="mt-20 text-center text-[#8B735B] pb-10">
          <p className="flex items-center justify-center gap-2">
            Made with <span className="text-[#FF4D4D]">❤️</span> for little explorers
          </p>
        </footer>
      </div>
    </main>
  );
}
