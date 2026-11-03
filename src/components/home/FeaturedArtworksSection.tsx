import React from 'react';
import { ArrowRight, Eye, Sparkles } from 'lucide-react';
import { artworksData } from '../../data/artworks';
import { Artwork } from '../../types/artwork';

interface FeaturedArtworksSectionProps {
  onSelectArtwork: (artwork: Artwork) => void;
  onViewAllGallery: () => void;
}

export const FeaturedArtworksSection: React.FC<FeaturedArtworksSectionProps> = ({
  onSelectArtwork,
  onViewAllGallery,
}) => {
  const featuredArtworks = artworksData.filter((a) => a.featured).slice(0, 4);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-fantasy-gold font-semibold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Selected Artworks
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold">
              ผลงานที่คัดสรร
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              ผลงานภาพประกอบและออกแบบตัวละครจากชุดภาพที่นำมาจัดแสดง
            </p>
          </div>

          <button
            onClick={onViewAllGallery}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fantasy-aqua hover:text-white transition-colors group"
          >
            <span>ดูผลงานทั้งหมดในแกลเลอรี ({artworksData.length} ชิ้น)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Curatorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {featuredArtworks.map((art, idx) => {
            // First item gets a prominent 7-column span, others share the grid
            const colSpan = idx === 0 ? 'md:col-span-7' : idx === 1 ? 'md:col-span-5' : 'md:col-span-6';
            const heightClass = idx === 0 ? 'h-[440px]' : 'h-[360px]';

            return (
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
                className={`${colSpan} group relative rounded-2xl overflow-hidden bg-surface-glass border border-surface-border hover:border-fantasy-violet/60 transition-all duration-300 cursor-pointer shadow-xl`}
              >
                {/* Artwork Image Container */}
                <div className={`w-full ${heightClass} relative overflow-hidden bg-canvas-subtle`}>
                  <img
                    src={art.image}
                    alt={art.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-canvas/80 backdrop-blur-md border border-white/15 text-fantasy-ice">
                      {art.categoryLabel}
                    </span>
                  </div>

                  {/* Hover Inspect Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="px-4 py-2 rounded-full bg-canvas/90 backdrop-blur-md border border-fantasy-aqua/50 text-white text-xs font-semibold flex items-center gap-2 shadow-glow-aqua">
                      <Eye className="w-4 h-4 text-fantasy-aqua" />
                      <span>ขยายดูรายละเอียด</span>
                    </div>
                  </div>

                  {/* Bottom Info in Image */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-fantasy-aqua transition-colors">
                        {art.title}
                      </h3>
                      <span className="text-xs text-fantasy-gold font-mono">{art.year}</span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-1 font-light">
                      {art.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
