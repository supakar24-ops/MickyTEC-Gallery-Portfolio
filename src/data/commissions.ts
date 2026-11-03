import { CommissionTier } from '../types/commission';

// ราคาแพ็กเกจที่ศิลปินยืนยัน ใช้ THB เท่านั้น ไม่มีสูตรค่าบริการเพิ่มเติม
export const commissionTiersData: CommissionTier[] = [
  {
    id: 'bust-up',
    title: 'Bust Up',
    subtitle: 'ภาพช่วงอกขึ้นไป',
    description: 'แพ็กเกจภาพ Bust Up สไตล์ Anime Art',
    priceThb: 200,
    sampleImage: '/artworks/01_male_portrait.jpg',
    sampleAlt: 'ภาพพอร์ตเทรตตัวละครชาย หนวดเครา พื้นหลังดำ',
  },
  {
    id: 'half-body',
    title: 'Half Body',
    subtitle: 'ภาพครึ่งตัว',
    description: 'แพ็กเกจภาพ Half Body สไตล์ Anime Art',
    priceThb: 400,
    sampleImage: '/artworks/08_blue_hair_formal_illustration.jpg',
    sampleAlt: 'ตัวละครผมสีฟ้าในชุดสีขาว ถือแก้วเครื่องดื่ม',
  },
  {
    id: 'full-body',
    title: 'Full Body',
    subtitle: 'ภาพเต็มตัว',
    description: 'แพ็กเกจภาพ Full Body สไตล์ Anime Art',
    priceThb: 800,
    sampleImage: '/artworks/02_tactical_fullbody.jpg',
    sampleAlt: 'ตัวละครอุปกรณ์ยุทธวิธีแบบเต็มตัว',
  },
];

export const commissionContactNote = 'ตัวอย่าง UI สำหรับ Portfolio ไม่ใช่ช่องทางรับคำสั่งซื้อ';

export function buildCommissionBrief(tier: CommissionTier, clientName: string, clientContact: string, details: string): string {
  return `[ข้อความตัวอย่าง Portfolio — เครดิต MickyTEC]\nแพ็กเกจ: ${tier.title}\nราคาแพ็กเกจ: ฿${tier.priceThb} THB\nชื่อผู้ติดต่อ: ${clientName.trim() || 'ยังไม่ได้ระบุ'}\nช่องทางติดต่อกลับ: ${clientContact.trim() || 'ยังไม่ได้ระบุ'}\nรายละเอียดงาน:\n${details.trim() || 'ยังไม่ได้ระบุ'}\n\n${commissionContactNote}`;
}
