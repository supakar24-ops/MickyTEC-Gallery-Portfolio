import React, { useEffect, useRef } from 'react';
import { X, Sparkles, Calendar, Layers, Maximize2, Tag, ArrowRight } from 'lucide-react';
import { Artwork } from '../../types/artwork';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onInquire: (artwork: Artwork) => void;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, onClose, onInquire }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!artwork) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [artwork, onClose]);

  if (!artwork) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-canvas/90 backdrop-blur-md animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="artwork-title" className="relative z-10 max-w-5xl w-full max-h-[92dvh] overflow-y-auto bg-surface-glass border border-surface-border-active rounded-2xl shadow-2xl flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-canvas/80 border border-white/20 text-slate-300 hover:text-white hover:bg-canvas transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Artwork Preview */}
        <div className="md:w-3/5 bg-canvas/95 flex items-center justify-center p-4 sm:p-8 relative min-h-[340px]">
          <div className="relative max-h-[75vh] w-full flex items-center justify-center">
            <img
              src={artwork.image}
              alt={artwork.alt}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
            />
          </div>
        </div>

        {/* Right: Artwork Metadata & Details */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-surface/70 border-t md:border-t-0 md:border-l border-surface-border">
          <div className="space-y-4">
            {/* Category Badge & Year */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-fantasy-violet/20 border border-fantasy-violet/40 text-fantasy-lavender">
                {artwork.categoryLabel}
              </span>
              {artwork.year && <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{artwork.year}</span>
              </div>}
            </div>

            {/* Title */}
            <div>
              {artwork.originalTitle && (
                <p className="text-xs text-slate-400 font-sans tracking-wide mb-1">
                  {artwork.originalTitle}
                </p>
              )}
              <h3 id="artwork-title" className="font-display text-2xl text-white font-bold tracking-wide">
                {artwork.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">รอชื่อผลงานจริงจากศิลปิน</p>
              {artwork.characterName && (
                <p className="text-xs text-fantasy-aqua font-medium mt-1">
                  ✦ Character: {artwork.characterName}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {artwork.description}
            </p>

            {/* Specs Grid */}
            <div className="p-3.5 rounded-xl bg-canvas-subtle/80 border border-white/5 space-y-2 text-xs">
              {artwork.medium && <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-fantasy-aqua" /> เทคนิค
                </span>
                <span className="text-slate-200 text-right">{artwork.medium}</span>
              </div>}
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-fantasy-gold" /> ขนาดไฟล์
                </span>
                <span className="text-slate-200 font-mono text-[11px]">{artwork.dimension}</span>
              </div>
            </div>

            {/* Color Palette */}
            {artwork.colorPalette.length > 0 && <div>
              <p className="text-xs text-slate-400 mb-2 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-fantasy-gold" /> ชุดสีของผลงาน (Artwork Palette)
              </p>
              <div className="flex items-center gap-2">
                {artwork.colorPalette.map((hex, idx) => (
                  <div
                    key={idx}
                    className="w-7 h-7 rounded-full border border-white/20 shadow-sm transition-transform hover:scale-125"
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                ))}
              </div>
            </div>}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {artwork.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1"
                >
                  <Tag className="w-2.5 h-2.5 text-slate-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                onClose();
                onInquire(artwork);
              }}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-fantasy-indigo via-fantasy-violet to-fantasy-aqua hover:opacity-95 transition-all shadow-glow-violet flex items-center justify-center gap-2 group"
            >
              <span>ดูแพ็กเกจตัวอย่าง</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              ✦ ตัวอย่างหน้า Commission สำหรับ Portfolio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
