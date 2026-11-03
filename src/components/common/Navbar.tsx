import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Feather } from 'lucide-react';
import { artistData } from '../../data/artist';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCommission: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenCommission }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'หน้าหลัก', sub: 'Home' },
    { id: 'gallery', label: 'ผลงานทั้งหมด', sub: 'Gallery' },
    { id: 'commission', label: 'ตัวอย่างคอมมิชชัน', sub: 'Commission' },
    { id: 'about', label: 'เกี่ยวกับศิลปิน', sub: 'About' },
    { id: 'contact', label: 'เครดิตผลงาน', sub: 'Credits' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-canvas-subtle/85 backdrop-blur-md border-b border-surface-border shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group transition-transform focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-fantasy-aqua via-fantasy-violet to-fantasy-gold">
              <div className="w-full h-full bg-canvas rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-fantasy-gold group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="block font-display text-lg tracking-wider text-white font-bold group-hover:text-fantasy-aqua transition-colors">
                {artistData.name}
              </span>
              <span className="block text-[10px] tracking-widest text-slate-400 font-sans uppercase">
                {artistData.nameSub} · Digital Art
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 lg:px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 relative group ${
                    isActive
                      ? 'text-white bg-surface-glass border border-surface-border-active shadow-glow-violet'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="text-[10px] opacity-40 ml-1 font-mono uppercase">
                    /{link.sub}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-fantasy-aqua to-fantasy-violet rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Commission Status Pill */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('commission');
                onOpenCommission();
              }}
              className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-surface/80 border border-fantasy-violet/30 hover:border-fantasy-aqua/60 transition-all shadow-sm hover:shadow-glow-aqua"
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-fantasy-aqua opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 bg-fantasy-aqua`}></span>
              </span>
              <span className="text-slate-200 group-hover:text-white transition-colors">
                สอบถามคอมมิชชัน
              </span>
              <Feather className="w-3.5 h-3.5 text-fantasy-gold group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('commission');
                onOpenCommission();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-surface border border-fantasy-violet/40 text-slate-200"
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-fantasy-aqua`}></span>
              <span>คอมมิชชัน</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-surface/60 border border-white/10 text-slate-200 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-canvas-subtle/95 backdrop-blur-xl border-b border-surface-border px-4 pt-3 pb-6 space-y-2 mt-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-surface border border-fantasy-violet/40 text-white'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-400 font-mono">/{link.sub}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
