import React from 'react';
import { ArrowRight, Feather, Sparkles } from 'lucide-react';
import { commissionTiersData, commissionContactNote } from '../../data/commissions';

interface CommissionPreviewSectionProps {
  onGoToCommission: (tierId?: string) => void;
}

export const CommissionPreviewSection: React.FC<CommissionPreviewSectionProps> = ({ onGoToCommission }) => (
  <section className="py-24 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-fantasy-violet/30 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-fantasy-aqua" />
          <span className="text-slate-300 font-medium">MickyTEC Commission</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-white font-bold">แพ็กเกจ Commission</h2>
        <p className="text-sm sm:text-base text-slate-300 font-light">เลือกชมแพ็กเกจ Bust Up, Half Body และ Full Body</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {commissionTiersData.map((tier) => (
          <div key={tier.id} className="relative rounded-3xl overflow-hidden bg-surface-glass border border-surface-border hover:border-fantasy-aqua/50 transition-all duration-300 flex flex-col justify-between shadow-xl">
            <div className="relative aspect-[16/10] overflow-hidden bg-canvas-subtle">
              <img src={tier.sampleImage} alt={tier.sampleAlt} loading="lazy" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90" />
              <span className="absolute bottom-3 left-4 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-canvas/80 text-fantasy-ice border border-white/10">ภาพจากแกลเลอรี</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-1">{tier.title}</h3>
                <p className="text-xs text-slate-400 mb-4 font-light leading-relaxed">{tier.subtitle}</p>
                <div className="py-3 px-4 rounded-xl bg-canvas-subtle/80 border border-white/5 mb-4">
                  <span className="text-[11px] text-slate-400 block font-light">ราคาแพ็กเกจ</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-display text-white">฿{tier.priceThb.toLocaleString()}</span>
                    <span className="text-xs font-mono text-fantasy-gold">THB</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{commissionContactNote}</p>
              </div>
              <button onClick={() => onGoToCommission(tier.id)} className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 bg-surface hover:bg-surface-hover text-slate-200 border border-surface-border">
                <Feather className="w-3.5 h-3.5" /><span>ดูแพ็กเกจตัวอย่าง</span><ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <button onClick={() => onGoToCommission()} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fantasy-gold hover:text-white transition-colors">
          <span>ดูแพ็กเกจและช่องทางสอบถาม</span><ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </section>
);
