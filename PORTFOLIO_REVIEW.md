# รายงานเตรียม MickyTEC Gallery สำหรับ Portfolio

สถานะ: เตรียมโฟลเดอร์อิสระผ่านการตรวจแล้ว และผู้ใช้อนุมัติให้นำขึ้น GitHub Private Repository การเปิด Public และ Deploy ยังไม่ได้รับอนุมัติ

## รอบ Git Checkpoint 4 พฤศจิกายน 2026

- ปลายทาง: https://github.com/supakar24-ops/MickyTEC-Gallery-Portfolio
- ตรวจผ่านบัญชี GitHub ในเครื่องแล้วว่าปลายทางเป็น Private ว่าง และบัญชีมีสิทธิ์ Push ไม่เปลี่ยน Visibility
- ใช้ Branch `main` และ Initial Commit ใหม่แบบไม่มี Parent ไม่คัดลอกประวัติเดิม
- บัญชีที่ตรวจจาก GitHub connector และ Git Credential Manager ตรงกัน: `supakar24-ops`, ID `304258857`
- ตั้ง Author และ Committer เป็น `304258857+supakar24-ops@users.noreply.github.com` เฉพาะ Repository นี้ อ้างอิง ID/Username และวันที่สร้างบัญชีที่ตรวจผ่าน GitHub API ตามรูปแบบ noreply ของ GitHub ไม่ใช้อีเมลส่วนตัว
- ตรวจรายการไฟล์และ Staged Diff ก่อน Commit ไม่รวม `node_modules/`, `dist/`, ภาพต้นฉบับ หรือไฟล์ลับ
- ผล Commit Hash และการตรวจไฟล์หลัง Push รายงานแยกภายหลัง ไม่บันทึกข้อมูลรับรองการเข้าสู่ระบบไว้ใน Repository

## ขอบเขตและไฟล์

- โฟลเดอร์ใหม่ชื่อ `MickyTEC_Gallery_Portfolio` อยู่ข้างโปรเจกต์ต้นฉบับ ไม่ได้อยู่ภายในโปรเจกต์เดิมหรือ Git Repository เดิม
- มีไฟล์โครงการสำหรับเตรียมเผยแพร่ 52 ไฟล์ ไม่รวม `node_modules/` และ `dist/` ที่สร้างใหม่ในเครื่องระหว่างทดสอบ
- คัดลอก Source Code, Tests, Config และ Assets ที่จำเป็นแบบตรวจ checksum ไม่คัดลอก Git History, รูปต้นฉบับ, ZIP, Backup หรือเอกสารภายในเดิม
- Source Code, Config, Tests และ Assets รวม 48 ไฟล์ตรงกับสำเนาที่ผู้ใช้ตรวจแล้วทุกไบต์ ไม่เปลี่ยนดีไซน์หรือเพิ่มฟีเจอร์
- เอกสาร 4 ไฟล์ที่จัดทำสำหรับโฟลเดอร์แยก: `README.md`, `ARTWORK_CREDITS.md`, `SOURCE_CODE_LICENSE.md` และรายงานนี้

## ภาพ ราคา และข้อมูลที่ยืนยัน

- ใช้ภาพจริงของ MickyTEC ทั้ง 12 รูป ด้านยาวไม่เกิน 1,024 พิกเซล
- ตำแหน่งและความทึบลายน้ำประมาณ 25% ผ่านการยืนยันแล้ว คงไฟล์ JPEG เดิมทุกไบต์ ไม่วาดลายน้ำหรือเข้ารหัสภาพใหม่
- รูปโปรไฟล์เป็นสำเนาย่อ 384 × 351 พิกเซล ภาพรวมตัวอย่าง 1,024 × 922 พิกเซล คงไฟล์เดิม
- ตรวจว่าไม่มีภาพที่ checksum ตรงกับต้นฉบับผลงานหรือรูปโปรไฟล์ต้นฉบับในไฟล์โครงการ
- แสดงเพียงเครดิต MickyTEC ไม่แสดงชื่อส่วนตัว อายุ หรือบัญชี Social ส่วนตัว
- Bust Up 200 THB, Half Body 400 THB และ Full Body **800 THB** ไม่มี Chibi หรือเงื่อนไข Commission ที่ยังไม่ได้ยืนยัน

## ผลทดสอบจากโฟลเดอร์แยกใหม่

ใช้ Node.js 24.22.0 และ npm 11.19.1 ติดตั้ง dependencies ใหม่ในโฟลเดอร์นี้ ไม่คัดลอก `node_modules` จากต้นฉบับ และตรวจว่าการ resolve React, React DOM, TypeScript, Vite และ Lucide อยู่ใน dependencies ของโฟลเดอร์นี้

| การตรวจ | ผล |
| --- | --- |
| `npm.cmd ci --no-audit --no-fund` | ผ่าน ติดตั้ง 137 packages ตาม lockfile; lockfile ไม่เปลี่ยน |
| `npm.cmd run typecheck` | ผ่าน ไม่มี TypeScript errors |
| `npm.cmd run build` | ผ่าน สร้าง Production Build ใน `dist/` ของโฟลเดอร์นี้ |
| `npm.cmd test` | ผ่านทั้ง `verify-artworks.cjs` และ `verify-portfolio.cjs` โดยอ่าน `dist/` ที่สร้างใหม่ |
| Gallery / Filters | ผ่าน ครบ 12 ภาพ ลำดับเดิม และ Filters ทั้งหมด/Full-Body/Half-Body/Character Design |
| Featured / Hero / Lightbox | ผ่านการเรนเดอร์และ callback ทุกภาพ รวม Click, Enter, Space, Escape และการจำลอง focus/scroll cleanup |
| Branding / ราคา / ข้อมูลศิลปิน | ผ่านค่าที่กำหนดไว้ รวม Full Body 800 THB และเครดิต MickyTEC เท่านั้น |
| ภาพและ Metadata | ผ่าน ขนาด Checksum จำนวนภาพ และ JPEG/PNG metadata ของภาพใน public และ Build |
| HTTP Preview ในเครื่อง | ผ่าน 17 ไฟล์ (หน้าเว็บและ Assets 16 รายการ) ตอบ 200 และ checksum ตรง Build ใหม่ |
| ขอบเขต Git | สร้าง Git ใหม่ในสำเนาอิสระบน main ไม่สืบทอด Repository จากโฟลเดอร์แม่ และไม่มี Git History เดิมถูกคัดลอก |

npm มีคำเตือนว่า postinstall ของ esbuild ยังไม่ได้รับอนุมัติจากนโยบาย install-scripts ของเครื่อง ไม่ได้อนุมัติสคริปต์เพิ่มเติม และ Production Build ผ่านด้วย dependencies ที่ติดตั้งได้ตามปกติ

Tests ใช้ React server rendering และ state/DOM จำลอง ไม่ใช่ E2E รอบนี้ยังไม่ได้ทดสอบการคลิกหรือ Responsive ในเบราว์เซอร์จริง จึงไม่อ้างว่าการตรวจส่วนนั้นผ่านแล้ว

## ผลตรวจความปลอดภัยและ Privacy

- ไม่พบรูปแบบ Secrets, API Keys, Private Keys, token ที่ตรวจหา อีเมลส่วนตัว ข้อมูลส่วนตัวของศิลปิน หรือพาธบัญชีผู้ใช้ในไฟล์โครงการและผล Build ที่ตรวจ
- ไม่พบ `.env`, ZIP, Backup, ภาพต้นฉบับ หรือไฟล์ทดลองที่ไม่เกี่ยวข้องในชุดไฟล์โครงการ
- ตรวจ JPEG/PNG แล้วไม่พบ EXIF/XMP/IPTC/ICC, GPS หรือข้อความ metadata ต้นฉบับ
- `.gitignore` ครอบคลุม dependencies, Build, `.env`, ไฟล์กุญแจ, ZIP และโฟลเดอร์ต้นฉบับ/ข้อมูลส่วนตัว
- `node_modules/` และ `dist/` มีอยู่จากการทดสอบในเครื่องเท่านั้น ต้องไม่รวมในชุดไฟล์ที่จะนำขึ้น GitHub
- ตรวจรูปแบบที่ระบุและตรวจไฟล์ประกอบ ไม่ใช่การรับรองความปลอดภัยทุกกรณี; รอบนี้ไม่ได้รัน dependency vulnerability audit
- เว็บโหลดฟอนต์จาก Google Fonts ตามดีไซน์เดิม ไม่มี API Key หรือ Backend ที่ต้องตั้งค่า

## สถานะต้นฉบับ

เปรียบเทียบ checksum ก่อนและหลังของไฟล์เดิม 360 ไฟล์ นอก `node_modules` รวม Source Code, ภาพ, สำเนา Portfolio เดิม และไฟล์ Git ที่ตรวจไว้: ไม่พบไฟล์เปลี่ยน เพิ่ม หรือลบ HEAD และ Git Status คงเดิม โดยสถานะ `?? portfolio/` ในโปรเจกต์ต้นฉบับมีอยู่ก่อนเริ่มรอบนี้

ไม่ได้แก้ README, Source Code, ภาพต้นฉบับ, ภาพลายน้ำ หรือประวัติ Git ของโปรเจกต์ต้นฉบับ

## สิทธิ์และสิ่งที่ต้องดำเนินการก่อนเผยแพร่

- ผู้ใช้อนุมัติการนำขึ้น Private Repository แล้ว แต่ยังต้องรออนุมัติก่อนเปลี่ยนเป็น Public หรือ Deploy
- ยืนยันสิทธิ์เผยแพร่สำเนา Artwork และรูปโปรไฟล์บน GitHub Public/Portfolio รวมถึงการเข้าถึงไฟล์ใน Repository และสิทธิ์ของภาพ/ตัวละครที่เกี่ยวข้อง การยืนยันลายน้ำเพียงอย่างเดียวไม่ใช่การอนุมัติเผยแพร่
- สิทธิ์ Artwork แยกจาก Source Code ไม่ให้สิทธิ์ใช้ภาพซ้ำ ดัดแปลง แจกจ่าย จำหน่าย หรือถอดลายน้ำโดยอัตโนมัติ
- ยังไม่ได้เลือกใบอนุญาต Open Source ของโค้ด หากต้องการให้สิทธิ์เพิ่มเติม ต้องให้ผู้ถือสิทธิ์ยืนยันก่อน ไม่ใช้ใบอนุญาตโค้ดครอบคลุม Artwork
- Commit และ Push ใช้เฉพาะโฟลเดอร์อิสระนี้ ตรวจรายการไฟล์อีกครั้งก่อนดำเนินการ ห้ามนำ Git History หรือภาพต้นฉบับจากโปรเจกต์เดิมไปเผยแพร่
- หากจะโฮสต์เว็บไซต์ในภายหลัง ให้ตรวจการตั้งค่าเส้นทางและสภาพแวดล้อมของโฮสต์แยกต่างหาก รอบนี้ยังไม่ได้เตรียมหรือทำ Deploy

เอกสารประกอบ: [README.md](README.md), [สิทธิ์ Artwork](ARTWORK_CREDITS.md), [สิทธิ์ Source Code](SOURCE_CODE_LICENSE.md)
