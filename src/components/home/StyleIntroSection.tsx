import React from 'react';
import { Palette, Wand2, Sparkles, Heart } from 'lucide-react';

export const StyleIntroSection: React.FC = () => {
  const styles = [
    {
      icon: Wand2,
      title: 'Anime Art',
      subtitle: 'สไตล์ผลงานที่จัดแสดง',
      description: 'ชมสำเนาผลงานสไตล์อนิเมะ เครดิต MickyTEC',
      color: 'text-fantasy-aqua',
      borderHover: 'hover:border-fantasy-aqua/50',
    },
    {
      icon: Palette,
      title: 'Twisted Wonderland',
      subtitle: 'แฟนด้อมที่สนใจ',
      description: 'แกลเลอรีมีภาพประกอบและงานตัวละครในบรรยากาศแฟนตาซี',
      color: 'text-fantasy-violet',
      borderHover: 'hover:border-fantasy-violet/50',
    },
    {
      icon: Sparkles,
      title: 'Artwork Gallery',
      subtitle: 'พื้นที่รวบรวมผลงาน',
      description: 'ชมภาพทั้ง 12 ผลงาน และคลิกที่ภาพเพื่อเปิดดูภาพเต็มในแกลเลอรี',
      color: 'text-fantasy-gold',
      borderHover: 'hover:border-fantasy-gold/50',
    },
    {
      icon: Heart,
      title: 'Commission',
      subtitle: 'แพ็กเกจงานวาด',
      description: 'Bust Up, Half Body และ Full Body ใช้แสดงตัวอย่างการเลือกแพ็กเกจและคัดลอกข้อความ',
      color: 'text-pink-400',
      borderHover: 'hover:border-pink-400/50',
    },
  ];

  return (
    <section className="py-20 bg-canvas-subtle/50 relative border-t border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-fantasy-aqua font-semibold">
            Artistic Signature &amp; Aesthetics
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-white font-bold">
            ผลงานใน Portfolio
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light">
            ชมผลงาน Anime Art พร้อมตัวอย่างส่วนประกอบของเว็บไซต์
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((style, idx) => {
            const Icon = style.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-surface-glass border border-surface-border ${style.borderHover} transition-all duration-300 group hover:-translate-y-1.5 shadow-lg`}
              >
                <div className="w-12 h-12 rounded-xl bg-canvas flex items-center justify-center mb-5 border border-white/10 group-hover:scale-110 transition-transform">
                  <Icon className={`w-6 h-6 ${style.color}`} />
                </div>
                <h3 className="font-display text-base font-bold text-white mb-1">
                  {style.title}
                </h3>
                <p className="text-xs text-fantasy-lavender mb-3 font-medium">
                  {style.subtitle}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {style.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
