import React from 'react';
import { Sparkles } from 'lucide-react';
import { artistData } from '../../data/artist';

export const SignaturePaletteSection: React.FC = () => {
  return (
    <section className="py-20 bg-canvas-subtle/70 border-t border-b border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-fantasy-lavender font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-fantasy-gold" /> MickyTEC Color Theme
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-white font-bold">
            ธีมสีหลักของ MickyTEC
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light">
            โทนสีที่สร้างบรรยากาศและเอกลักษณ์ให้กับ MickyTEC
          </p>
        </div>

        {/* Theme Color Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {artistData.signatureColors.map((color) => (
            <div
              key={color.name}
              className="group p-4 rounded-2xl bg-surface-glass border border-surface-border hover:border-fantasy-violet/60 transition-all duration-300 flex flex-col shadow-lg hover:-translate-y-1"
            >
              <div
                className="w-full aspect-square rounded-xl shadow-inner mb-3 relative overflow-hidden border border-white/20 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: color.hex }}
              />
              <h3 className="font-display text-sm font-bold text-white">
                {color.name}
              </h3>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed border-t border-white/5 pt-3 mt-3">
                {color.meaning}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-slate-400 font-sans">
          ✦ ธีมสีนี้เป็นส่วนหนึ่งของบรรยากาศบนเว็บไซต์
        </div>
      </div>
    </section>
  );
};
