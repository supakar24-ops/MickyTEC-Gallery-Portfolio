import React from 'react';
import { Sparkles, ArrowRight, Eye, Feather } from 'lucide-react';
import { artistData } from '../../data/artist';
import { artworksData } from '../../data/artworks';
import { Artwork } from '../../types/artwork';

interface HeroSectionProps {
  onExploreGallery: () => void;
  onExploreCommission: () => void;
  onSelectArtwork: (artwork: Artwork) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreGallery,
  onExploreCommission,
  onSelectArtwork,
}) => {
  const heroArtwork = artworksData.find((a) => a.featured) || artworksData[0];

  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Decorative Ethereal Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-fantasy-violet/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-fantasy-aqua/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-fantasy-gold/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill & Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-glass border border-surface-border text-xs">
              <span className="w-2 h-2 rounded-full bg-fantasy-aqua animate-pulse" />
              <span className="text-slate-300 font-medium">Anime Art</span>
              <span className="text-fantasy-gold">✦</span>
              <span className="text-fantasy-lavender font-semibold text-[11px]">MickyTEC</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-[0.3em] text-slate-400 font-sans font-semibold">
                Frontend Portfolio · Artwork by MickyTEC
              </h2>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-[1.15] space-y-2 sm:space-y-3">
                <span className="block whitespace-nowrap">Micky TEC</span>
                <span className="block w-fit max-w-full mx-auto lg:mx-0 whitespace-nowrap text-[clamp(1.25rem,5.6vw,2.75rem)] lg:text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.25] bg-[linear-gradient(100deg,#F0A8CE_0%,#EFB29B_20%,#E8D08C_40%,#A8D4AE_60%,#8ECFE1_80%,#C5B0ED_100%)] bg-clip-text text-transparent">
                  Twisted wonderland
                </span>
              </h1>
            </div>

            {/* Sub-headline / Tagline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              <strong className="text-white font-medium">{artistData.name}</strong> · ตัวอย่างเว็บไซต์แสดงผลงาน Anime Art สำหรับ Portfolio ใช้สำเนาผลงานจริงที่ลดความละเอียดและใส่ลายน้ำ พร้อมตัวอย่างหน้าคอมมิชชัน
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreGallery}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-fantasy-indigo via-fantasy-violet to-fantasy-aqua hover:shadow-glow-aqua transition-all flex items-center justify-center gap-2 group"
              >
                <Eye className="w-4 h-4 text-fantasy-ice" />
                <span>ชมแกลเลอรีผลงาน</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCommission}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-200 bg-surface/90 hover:bg-surface-hover border border-surface-border hover:border-fantasy-gold/60 transition-all flex items-center justify-center gap-2"
              >
                <Feather className="w-4 h-4 text-fantasy-gold" />
                <span>เช็คเรทราคา Commission</span>
              </button>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-surface-border max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-lg font-bold font-display text-white">{artworksData.length}</p>
                <p className="text-[11px] text-slate-400">ผลงานในแกลเลอรี</p>
              </div>
              <div>
                <p className="text-lg font-bold font-display text-fantasy-aqua">{artworksData.filter((art) => art.featured).length}</p>
                <p className="text-[11px] text-slate-400">ผลงานที่คัดสรร</p>
              </div>
              <div>
                <p className="text-lg font-bold font-display text-fantasy-gold">JPG</p>
                <p className="text-[11px] text-slate-400">ไฟล์ภาพที่จัดแสดง</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Artwork Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              {/* Glow Behind the Artwork Card */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-fantasy-aqua/40 via-fantasy-violet/40 to-fantasy-gold/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Artwork Frame */}
              <div className="relative bg-surface-glass border border-surface-border rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 group-hover:-translate-y-1">
                {/* Header Tag in Frame */}
                <div className="p-3 bg-canvas/70 border-b border-surface-border flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-fantasy-gold font-medium">
                    <Sparkles className="w-3.5 h-3.5" /> ผลงานที่คัดสรร
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {heroArtwork.categoryLabel}
                  </span>
                </div>

                {/* Hero Artwork Image */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`ดูภาพขยาย ${heroArtwork.title}`}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onSelectArtwork(heroArtwork);
                    }
                  }}
                  className="relative aspect-[3/4] cursor-pointer overflow-hidden bg-canvas-subtle"
                  onClick={() => onSelectArtwork(heroArtwork)}
                >
                  <img
                    src={heroArtwork.image}
                    alt={heroArtwork.alt}
                    className="w-full h-full object-contain"
                  />

                  {/* Floating Click to inspect badge */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-canvas/90 backdrop-blur-sm border border-white/20 text-slate-200 text-xs flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                    <Eye className="w-3.5 h-3.5 text-fantasy-aqua" />
                    <span>คลิกเพื่อดูภาพขยาย</span>
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div className="p-4 bg-surface/90 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-bold text-white tracking-wide">
                      {heroArtwork.title}
                    </h3>
                    <span className="text-xs text-fantasy-aqua font-mono">{heroArtwork.year}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {heroArtwork.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
