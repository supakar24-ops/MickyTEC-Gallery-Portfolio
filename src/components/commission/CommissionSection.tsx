import React, { useState } from 'react';
import { Sparkles, Feather, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';
import { commissionTiersData, commissionContactNote, buildCommissionBrief } from '../../data/commissions';
import { artistData } from '../../data/artist';
import { CommissionTierId } from '../../types/commission';

interface CommissionSectionProps { initialTierId?: string; }

export const CommissionSection: React.FC<CommissionSectionProps> = ({ initialTierId }) => {
  const [selectedTier, setSelectedTier] = useState<CommissionTierId>(
    commissionTiersData.find((tier) => tier.id === initialTierId)?.id || 'bust-up'
  );
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [characterBrief, setCharacterBrief] = useState('');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const currentTier = commissionTiersData.find((tier) => tier.id === selectedTier) || commissionTiersData[0];
  const generatedBrief = buildCommissionBrief(currentTier, clientName, clientContact, characterBrief);

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(generatedBrief);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
  };

  const selectTier = (id: CommissionTierId) => {
    setSelectedTier(id);
    setCopyStatus('idle');
  };

  return (
    <section className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-glass border border-surface-border text-xs shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-fantasy-aqua" /><span>MickyTEC Commission</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-white font-bold tracking-tight">แพ็กเกจ Commission</h1>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">ตัวอย่างแพ็กเกจและแบบฟอร์มคอมมิชชันสำหรับ Portfolio เครดิตภาพ MickyTEC ไม่มีการรับคำสั่งซื้อหรือชำระเงิน</p>
        </div>

        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-display text-2xl sm:text-3xl text-white font-bold">ราคาแพ็กเกจ</h2>
            <p className="text-xs sm:text-sm text-slate-400">{commissionContactNote}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commissionTiersData.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <div key={tier.id} className={`rounded-3xl overflow-hidden bg-surface-glass border flex flex-col justify-between shadow-2xl transition-all duration-300 ${isSelected ? 'border-fantasy-aqua shadow-glow-aqua' : 'border-surface-border hover:border-fantasy-violet/40'}`}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-canvas-subtle">
                    <img src={tier.sampleImage} alt={tier.sampleAlt} loading="lazy" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90" />
                    <span className="absolute bottom-3 left-4 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-canvas/80 text-fantasy-ice border border-white/10">ภาพจากแกลเลอรี</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-white">{tier.title}</h3>
                        <p className="text-xs text-fantasy-lavender mt-1">{tier.subtitle}</p>
                        <p className="text-xs text-slate-400 font-light mt-2 leading-relaxed">{tier.description}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-canvas-subtle border border-white/5">
                        <span className="text-3xl font-display font-bold text-white">฿{tier.priceThb.toLocaleString()}</span>
                        <span className="text-xs text-fantasy-gold ml-2">THB</span>
                      </div>
                    </div>
                    <button aria-pressed={isSelected} onClick={() => { selectTier(tier.id); document.getElementById('commission-calculator')?.scrollIntoView({ behavior: 'smooth' }); }} className={`w-full py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${isSelected ? 'bg-fantasy-aqua text-canvas' : 'bg-surface hover:bg-surface-hover text-white border border-surface-border'}`}>
                      <Feather className="w-3.5 h-3.5" /><span>{isSelected ? 'กำลังเลือกแพ็กเกจนี้' : 'เลือกแพ็กเกจนี้'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div id="commission-calculator" className="rounded-3xl bg-surface-glass border border-surface-border-active p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-fantasy-aqua font-semibold">Commission Inquiry</span>
              <h2 className="font-display text-2xl sm:text-3xl text-white font-bold">เตรียมข้อความตัวอย่าง</h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light">เลือกแพ็กเกจและเขียนรายละเอียดเพื่อทดลองคัดลอกข้อความ ข้อมูลไม่ถูกส่งหรือบันทึกลงฐานข้อมูล</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 min-w-0 space-y-5">
                <fieldset>
                  <legend className="block text-xs font-semibold text-slate-300 mb-2">แพ็กเกจที่สนใจ</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {commissionTiersData.map((tier) => (
                      <button key={tier.id} type="button" aria-pressed={selectedTier === tier.id} onClick={() => selectTier(tier.id)} className={`p-3 rounded-xl text-left border text-xs transition-all ${selectedTier === tier.id ? 'bg-fantasy-violet/25 border-fantasy-violet text-white font-bold' : 'bg-canvas-subtle border-white/5 text-slate-400 hover:text-white'}`}>
                        <span className="block font-medium">{tier.title}</span><span className="text-[10px] text-fantasy-aqua font-mono">฿{tier.priceThb}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label htmlFor="client-name" className="block text-[11px] text-slate-400 mb-1">ชื่อหรือนามแฝง (ไม่บังคับ)</label>
                    <input id="client-name" type="text" value={clientName} onChange={(event) => { setClientName(event.target.value); setCopyStatus('idle'); }} className="w-full px-3 py-2 rounded-xl bg-canvas-subtle border border-white/10 text-xs text-white focus:outline-none focus:border-fantasy-aqua" />
                  </div>
                  <div>
                    <label htmlFor="client-contact" className="block text-[11px] text-slate-400 mb-1">ช่องทางติดต่อกลับ (ไม่บังคับ)</label>
                    <input id="client-contact" type="text" value={clientContact} onChange={(event) => { setClientContact(event.target.value); setCopyStatus('idle'); }} className="w-full px-3 py-2 rounded-xl bg-canvas-subtle border border-white/10 text-xs text-white focus:outline-none focus:border-fantasy-aqua" />
                  </div>
                </div>
                <div>
                  <label htmlFor="commission-details" className="block text-[11px] text-slate-400 mb-1">รายละเอียดงานและภาพอ้างอิง</label>
                  <textarea id="commission-details" rows={5} value={characterBrief} onChange={(event) => { setCharacterBrief(event.target.value); setCopyStatus('idle'); }} className="w-full px-3 py-2 rounded-xl bg-canvas-subtle border border-white/10 text-xs text-white focus:outline-none focus:border-fantasy-aqua" />
                </div>
              </div>
              <div className="lg:col-span-5 min-w-0 p-6 rounded-2xl bg-canvas-subtle/95 border border-surface-border-active space-y-5">
                <div>
                  <p className="text-[11px] text-fantasy-lavender font-semibold">{currentTier.title}</p>
                  <p className="text-3xl font-display font-bold text-white mt-1">฿{currentTier.priceThb} <span className="text-sm text-fantasy-gold">THB</span></p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{commissionContactNote}</p>
                <label htmlFor="commission-message" className="block text-xs text-slate-300">ข้อความสำหรับคัดลอก</label>
                <textarea id="commission-message" readOnly value={generatedBrief} rows={9} className="w-full p-3 rounded-xl bg-surface/80 border border-white/5 text-xs text-slate-200 leading-relaxed" />
                <button onClick={handleCopyBrief} className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-fantasy-indigo to-fantasy-violet hover:opacity-95 transition-all shadow-glow-violet flex items-center justify-center gap-2">
                  {copyStatus === 'copied' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}<span>คัดลอกข้อความสอบถาม</span>
                </button>
                <p role="status" className="text-xs text-slate-300">{copyStatus === 'copied' ? 'คัดลอกข้อความตัวอย่างแล้ว' : copyStatus === 'failed' ? 'คัดลอกไม่สำเร็จ กรุณาเลือกและคัดลอกข้อความในช่องด้านบน' : 'แบบฟอร์มสาธิตสำหรับ Portfolio ไม่มีการส่งข้อมูลอัตโนมัติ'}</p>
                <div className="flex flex-wrap gap-2">
                  {artistData.socials.map((social) => (
                    <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl text-xs bg-surface border border-surface-border text-white flex items-center gap-2"><MessageSquare className="w-3.5 h-3.5 text-fantasy-aqua" />{social.platform}<ExternalLink className="w-3 h-3" /></a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 rounded-3xl bg-surface-glass border border-surface-border text-center space-y-3">
          <h2 className="font-display text-2xl text-white font-bold">ข้อมูลตัวอย่างแพ็กเกจ</h2>
          <p className="text-sm text-slate-300">{commissionContactNote}</p>
        </div>
      </div>
    </section>
  );
};
