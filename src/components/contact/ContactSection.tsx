import React from 'react';
import { Sparkles, Palette, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => (
  <section className="pt-28 pb-24 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-fantasy-aqua font-semibold flex items-center justify-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-fantasy-gold" /> MickyTEC Portfolio</span>
        <h1 className="font-display text-4xl sm:text-5xl text-white font-bold tracking-tight">เครดิตและสิทธิ์การใช้ภาพ</h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">สำเนานี้แสดงเฉพาะเครดิต MickyTEC โดยไม่เผยแพร่ข้อมูลส่วนตัวหรือบัญชีติดต่อของศิลปิน</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="p-6 rounded-2xl bg-surface-glass border border-surface-border shadow-xl space-y-3">
          <Palette className="w-6 h-6 text-fantasy-lavender" />
          <h2 className="font-display text-xl font-bold text-white">Artwork credit: MickyTEC</h2>
          <p className="text-sm text-slate-300 leading-relaxed">ใช้ผลงานจริงทั้ง 12 ภาพในรูปแบบสำเนาย่อพร้อมลายน้ำ ไม่สร้างภาพ AI และไม่รวมภาพต้นฉบับ</p>
        </div>
        <div className="p-6 rounded-2xl bg-surface-glass border border-surface-border shadow-xl space-y-3">
          <ShieldCheck className="w-6 h-6 text-fantasy-aqua" />
          <h2 className="font-display text-xl font-bold text-white">สำหรับแสดง Portfolio</h2>
          <p className="text-sm text-slate-300 leading-relaxed">เว็บไซต์นี้ไม่มีช่องทางรับคำสั่งซื้อหรือชำระเงิน การแสดงสำเนาไม่ใช่การอนุญาตให้นำภาพไปใช้ต่อ</p>
        </div>
      </div>
    </div>
  </section>
);
