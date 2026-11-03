import React from 'react';
import { Sparkles, Heart, ArrowUp } from 'lucide-react';
import { artistData } from '../../data/artist';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-canvas border-t border-surface-border pt-16 pb-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-fantasy-violet/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-surface-border">

          {/* Brand info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-fantasy-aqua via-fantasy-violet to-fantasy-gold">
                <div className="w-full h-full bg-canvas rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-fantasy-gold" />
                </div>
              </div>
              <div>
                <span className="font-display text-lg tracking-wider text-white font-bold">
                  {artistData.name}
                </span>
                <span className="block text-[10px] tracking-widest text-slate-400 font-sans uppercase">
                  {artistData.nameSub}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-md font-light leading-relaxed">
              {artistData.tagline}
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Artworks © {new Date().getFullYear()} {artistData.name}. All rights reserved.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">
              เมนูหลัก (Navigation)
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    scrollToTop();
                  }}
                  className="hover:text-fantasy-aqua transition-colors"
                >
                  หน้าหลัก (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('gallery');
                    scrollToTop();
                  }}
                  className="hover:text-fantasy-aqua transition-colors"
                >
                  แกลเลอรีผลงาน (Gallery)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('commission');
                    scrollToTop();
                  }}
                  className="hover:text-fantasy-aqua transition-colors"
                >
                  จ้างวานคอมมิชชัน (Commission)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    scrollToTop();
                  }}
                  className="hover:text-fantasy-aqua transition-colors"
                >
                  เกี่ยวกับศิลปิน (About)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    scrollToTop();
                  }}
                  className="hover:text-fantasy-aqua transition-colors"
                >
                  เครดิตและสิทธิ์
                </button>
              </li>
            </ul>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">
              เครดิตงานศิลป์
            </p>
            <p className="text-xs text-slate-400">เครดิตงานศิลป์ MickyTEC · สำเนาสำหรับ Portfolio</p>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors pt-2"
            >
              <ArrowUp className="w-3.5 h-3.5 text-fantasy-gold" />
              <span>กลับขึ้นด้านบน (Back to Top)</span>
            </button>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            Developed with <Heart className="w-3.5 h-3.5 text-rose-400 inline mx-0.5" /> for Artist Showcase &amp; Commission Hub
          </p>
          <p className="text-[11px] text-slate-400">
            Powered by React, Vite &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
