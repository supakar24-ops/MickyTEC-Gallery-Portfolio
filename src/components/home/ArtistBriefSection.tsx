import React from 'react';
import { ArrowRight, Sparkles, ExternalLink, MessageSquare } from 'lucide-react';
import { artistData } from '../../data/artist';

interface ArtistBriefSectionProps {
  onLearnMoreAbout: () => void;
  onGoToContact: () => void;
}

export const ArtistBriefSection: React.FC<ArtistBriefSectionProps> = ({
  onLearnMoreAbout,
  onGoToContact,
}) => {
  return (
    <section className="py-24 bg-canvas-subtle/80 border-t border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: Avatar & Graphic Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Outer Glow */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-fantasy-aqua via-fantasy-violet to-fantasy-gold opacity-50 blur-2xl group-hover:opacity-75 transition-opacity" />

              <div className="relative aspect-square rounded-full p-2 bg-gradient-to-tr from-fantasy-aqua/50 via-fantasy-violet/50 to-fantasy-gold/50 shadow-2xl">
                <img
                  src={artistData.avatar}
                  alt={artistData.name}
                  className="w-full h-full object-cover rounded-full bg-canvas-subtle"
                />

                {/* Floating Badge */}
                <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-surface-glass border border-white/20 backdrop-blur-md shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-white">Anime Art</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Artist Bio & Vision */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-fantasy-gold font-semibold flex items-center justify-center lg:justify-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Meet the Artist
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-white font-bold">
                {artistData.name}
              </h2>
              <p className="text-sm text-fantasy-lavender font-mono">
                {artistData.nameSub} · {artistData.title}
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {artistData.bio}
            </p>

            {/* Confirmed interests */}
            <div>
              <p className="text-xs text-slate-400 mb-2 font-medium">รูปแบบผลงานที่จัดแสดง:</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {artistData.interests.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs bg-surface border border-white/10 text-slate-300"
                  >
                    ✦ {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button
                onClick={onLearnMoreAbout}
                className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-surface hover:bg-surface-hover border border-fantasy-violet/40 transition-all flex items-center justify-center gap-2"
              >
                <span>เกี่ยวกับเครดิตผลงาน</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGoToContact}
                className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-200 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-fantasy-gold" />
                <span>เครดิตและสิทธิ์</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
