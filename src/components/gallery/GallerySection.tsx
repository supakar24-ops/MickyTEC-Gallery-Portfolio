import React, { useState } from 'react';
import { Sparkles, Eye } from 'lucide-react';
import { artworksData } from '../../data/artworks';
import { Artwork, ArtworkCategory } from '../../types/artwork';

interface GallerySectionProps {
  onSelectArtwork: (artwork: Artwork) => void;
  onInquireCategory: (category: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onSelectArtwork,
  onInquireCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ArtworkCategory>('all');

  const categories: { id: ArtworkCategory; label: string; count: number }[] = [
    { id: 'all', label: 'ทั้งหมด (All Works)', count: artworksData.length },
    {
      id: 'full-body',
      label: 'ภาพเต็มตัว (Full-Body)',
      count: artworksData.filter((a) => a.category === 'full-body').length,
    },
    {
      id: 'half-body',
      label: 'ภาพครึ่งตัว (Half-Body)',
      count: artworksData.filter((a) => a.category === 'half-body').length,
    },
    {
      id: 'character-design',
      label: 'ออกแบบตัวละคร (Character Design)',
      count: artworksData.filter((a) => a.category === 'character-design').length,
    },
  ];

  const filteredArtworks =
    selectedCategory === 'all'
      ? artworksData
      : artworksData.filter((a) => a.category === selectedCategory);

  return (
    <section className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surface-border text-xs">
            <Sparkles className="w-3.5 h-3.5 text-fantasy-gold" />
            <span className="text-slate-300">Complete Archive · {artworksData.length} Artworks</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-white font-bold tracking-tight">
            แกลเลอรีผลงานทั้งหมด
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            ชมผลงานทั้ง {artworksData.length} ภาพ คลิกเพื่อดูภาพเต็มและรายละเอียด ชื่อผลงานจริงอยู่ระหว่างรอศิลปินยืนยัน จึงใช้หมายเลขภาพสำหรับอ้างอิง
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-fantasy-indigo via-fantasy-violet to-fantasy-aqua text-white shadow-glow-violet scale-105'
                    : 'bg-surface hover:bg-surface-hover text-slate-300 border border-surface-border'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((art) => (
            <div
              key={art.id}
              role="button"
              tabIndex={0}
              aria-label={`ดูภาพขยาย ${art.title}`}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelectArtwork(art);
                }
              }}
              onClick={() => onSelectArtwork(art)}
              className="group relative rounded-2xl overflow-hidden bg-surface-glass border border-surface-border hover:border-fantasy-violet/60 transition-all duration-300 flex flex-col justify-between shadow-xl hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-canvas-subtle">
                <img
                  src={art.image}
                  alt={art.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-75" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-canvas/80 backdrop-blur-md border border-white/15 text-fantasy-ice">
                    {art.categoryLabel}
                  </span>
                </div>

                {/* Hover Inspect Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-4 py-2 rounded-full bg-canvas/90 backdrop-blur-md border border-fantasy-aqua/50 text-white text-xs font-semibold flex items-center gap-2 shadow-glow-aqua">
                    <Eye className="w-4 h-4 text-fantasy-aqua" />
                    <span>คลิกเพื่อดูภาพขยาย</span>
                  </div>
                </div>

                {/* Quick Swatch Preview in Image */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 z-10">
                  {art.colorPalette.slice(0, 4).map((hex, i) => (
                    <div
                      key={i}
                      className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-sm"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-fantasy-aqua transition-colors line-clamp-1">
                    {art.title}
                  </h3>
                  <span className="text-xs text-fantasy-gold font-mono ml-2 flex-shrink-0">
                    {art.year}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 font-light leading-relaxed">
                  {art.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-2">
                  {art.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                  {art.tags.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                      +{art.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <p role="status" className="py-16 text-center text-sm text-slate-300">
            ยังไม่มีผลงานในหมวดนี้ เลือกหมวดอื่นหรือทั้งหมดเพื่อชมผลงาน
          </p>
        )}

      </div>
    </section>
  );
};
