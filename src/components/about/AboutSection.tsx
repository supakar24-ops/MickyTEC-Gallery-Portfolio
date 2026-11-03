import React from 'react';
import { Sparkles, Feather } from 'lucide-react';
import { artistData } from '../../data/artist';

interface AboutSectionProps {
  onGoToContact: () => void;
  onGoToCommission: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onGoToContact,
  onGoToCommission,
}) => {
  return (
    <section className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-fantasy-gold font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> About MickyTEC
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-white font-bold tracking-tight">
            เกี่ยวกับศิลปิน (About the Artist)
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light">
            เครดิตงานศิลป์และข้อมูลเว็บไซต์ Portfolio
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Avatar & Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-sm w-full">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-fantasy-aqua/30 via-fantasy-violet/30 to-fantasy-gold/20 blur-xl opacity-75" />

              <div className="relative rounded-3xl bg-surface-glass border border-surface-border p-6 shadow-2xl text-center space-y-5">
                <div className="w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-full p-1 bg-gradient-to-tr from-fantasy-aqua via-fantasy-violet to-fantasy-gold">
                  <img
                    src="/artworks/mickytec-profile.png"
                    alt={`ภาพเครดิตผลงาน ${artistData.name}`}
                    width={384}
                    height={351}
                    decoding="async"
                    className="w-full h-full object-contain object-center rounded-full bg-white p-1"
                  />
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    {artistData.name}
                  </h2>
                  <p className="text-xs text-fantasy-lavender font-mono mt-0.5">
                    {artistData.nameSub}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {artistData.title}
                  </p>
                </div>

                {/* Stats Grid inside Profile Card */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                  {artistData.stats.map((stat, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-canvas-subtle/80 text-left">
                      <p className="text-base font-bold font-display text-white break-words">{stat.value}</p>
                      <p className="text-[10px] text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs text-fantasy-aqua uppercase tracking-wider font-semibold">
                ✦ Artwork credit · MickyTEC
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                เครดิตผลงาน MickyTEC
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {artistData.bio}
            </p>

            <p className="text-sm text-slate-300 font-light leading-relaxed">
              ชมผลงานในแกลเลอรี หรือดูแพ็กเกจ Bust Up, Half Body และ Full Body สำเนานี้เป็นตัวอย่างการแสดงผล ไม่ได้รับคำสั่งซื้อจริง
            </p>

            {/* Specialties List */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                รูปแบบผลงานที่จัดแสดง:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                {artistData.interests.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-white/5">
                    <Feather className="w-3.5 h-3.5 text-fantasy-aqua flex-shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={onGoToCommission}
                className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-fantasy-indigo via-fantasy-violet to-fantasy-aqua shadow-glow-violet"
              >
                ดูตัวอย่าง Commission
              </button>
              <button
                onClick={onGoToContact}
                className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-300 bg-surface hover:bg-surface-hover border border-surface-border"
              >
                เครดิตและสิทธิ์การใช้ภาพ
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
