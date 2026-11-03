// Checks only Portfolio files and the generated build; no Git/original artwork access.
(async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const assert = require('node:assert/strict');
  const crypto = require('node:crypto');
  const ts = require('typescript');
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const root = path.resolve(__dirname, '..');
  const buildRoot = path.resolve(process.env.MICKYTEC_BUILD_DIR || path.join(root, 'dist'));
  const icons = new (require('node:module'))(require.resolve('lucide-react'));
  icons.exports = await import('lucide-react'); icons.loaded = true;
  require.cache[require.resolve('lucide-react')] = icons;
  for (const extension of ['.ts', '.tsx']) require.extensions[extension] = (module, file) => module._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText, file);
  const { artistData } = require('../src/data/artist.ts');
  const { artworksData } = require('../src/data/artworks.ts');
  const { commissionTiersData, buildCommissionBrief } = require('../src/data/commissions.ts');
  const { App } = require('../src/App.tsx');
  const { AboutSection } = require('../src/components/about/AboutSection.tsx');
  const { ContactSection } = require('../src/components/contact/ContactSection.tsx');
  const { CommissionSection } = require('../src/components/commission/CommissionSection.tsx');
  const { HeroSection } = require('../src/components/home/HeroSection.tsx');
  const { SignaturePaletteSection } = require('../src/components/home/SignaturePaletteSection.tsx');
  const manifest = require('../tests/fixtures/portfolio-assets.json');
  const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
  const walk = (el, predicate) => Array.isArray(el) ? el.flatMap(child => walk(child, predicate)) : React.isValidElement(el) ? [...(predicate(el) ? [el] : []), ...walk(el.props.children, predicate)] : [];
  const privatePattern = /https?:\/\/(?:www\.)?(?:facebook|twitter|x|instagram|discord|pixiv)\.[a-z]+\/|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|C:[\\/]Users[\\/]|อายุ\s*\d+/i;
  assert.equal(artistData.name, 'MickyTEC');
  assert.equal(artistData.artistName, 'MickyTEC');
  assert.equal(Object.hasOwn(artistData, 'age'), false);
  assert.equal(Object.hasOwn(artistData, 'fandom'), false);
  assert.deepEqual(artistData.socials, []);
  assert.deepEqual(commissionTiersData.map(tier => [tier.id, tier.priceThb]), [['bust-up',200],['half-body',400],['full-body',800]]);
  const aboutTree = AboutSection({});
  const profile = walk(aboutTree, el => el.type === 'img')[0];
  assert.equal(profile.props.width, manifest.profile.width);
  assert.equal(profile.props.height, manifest.profile.height);
  assert.match(profile.props.className, /object-contain/);
  for (const Component of [App, AboutSection, ContactSection, CommissionSection]) {
    const html = renderToStaticMarkup(React.createElement(Component, {}));
    assert.doesNotMatch(html, privatePattern);
    assert.doesNotMatch(html, /Chibi|จิบิ|mailto:|href="https?:/i);
    for (const match of html.matchAll(/src="(\/[^"?]+)"/g)) {
      assert.ok(fs.existsSync(path.join(root, 'public', match[1])), match[1]);
      assert.ok(fs.existsSync(path.join(buildRoot, match[1])), match[1]);
    }
  }
  const hero = walk(HeroSection({}), el => el.type === 'h1')[0];
  assert.deepEqual(React.Children.toArray(hero.props.children).map(el => el.props.children.trim()), ['Micky TEC','Twisted wonderland']);
  const theme = SignaturePaletteSection();
  assert.equal(walk(theme, el => el.type === 'h3').length, 6);
  assert.equal(walk(theme, el => el.type === 'button').length, 0);
  const themeText = renderToStaticMarkup(theme).replace(/<[^>]+>/g, ' ');
  assert.doesNotMatch(themeText, /#[0-9a-f]{3,8}|HEX|คัดลอก/i);
  for (const tier of commissionTiersData) {
    const html = renderToStaticMarkup(React.createElement(CommissionSection,{initialTierId:tier.id}));
    assert.match(html,new RegExp(`ราคาแพ็กเกจ: ฿${tier.priceThb} THB`));
    const message=buildCommissionBrief(tier,'ผู้ทดสอบ','ช่องทางตัวอย่าง','รายละเอียดตัวอย่าง');
    assert.ok(message.includes('เครดิต MickyTEC'));
    assert.doesNotMatch(message,privatePattern);
  }
  console.log('PASS: Credit-only identity, no personal social links; correct packages, Hero/theme and derivative About image.');

  function jpegInfo(bytes) {
    assert.equal(bytes.readUInt16BE(0),0xffd8);
    let offset=2,dimensions;
    while(offset<bytes.length){
      assert.equal(bytes[offset++],0xff);
      while(bytes[offset]===0xff)offset++;
      const marker=bytes[offset++];
      if(marker===0xda||marker===0xd9)break;
      const length=bytes.readUInt16BE(offset);
      assert.ok(length>=2&&offset+length<=bytes.length);
      assert.ok(!(marker>=0xe1&&marker<=0xef)&&marker!==0xfe,'Unexpected EXIF/XMP/IPTC/ICC/comment segment');
      if([0xc0,0xc1,0xc2].includes(marker))dimensions={height:bytes.readUInt16BE(offset+3),width:bytes.readUInt16BE(offset+5)};
      offset+=length;
    }
    assert.ok(dimensions);
    return dimensions;
  }
  function pngInfo(bytes){
    assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
    for(let offset=8;offset<bytes.length;){
      const length=bytes.readUInt32BE(offset);
      const type=bytes.toString('ascii',offset+4,offset+8);
      assert.ok(['IHDR','IDAT','IEND','sRGB','gAMA','pHYs'].includes(type),'Unexpected PNG metadata '+type);
      offset+=length+12;
    }
    return {width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)};
  }
  assert.equal(manifest.credit,'MickyTEC');
  assert.equal(manifest.artworks.length,12);
  assert.equal(new Set(manifest.artworks.map(entry=>entry.sha256)).size,12);
  for(const entry of [...manifest.artworks,manifest.profile]){
    assert.equal(entry.credit,'MickyTEC');
    assert.ok(entry.watermark.x>=0&&entry.watermark.y>=0);
    assert.ok(entry.watermark.x+entry.watermark.width<=entry.width);
    assert.ok(entry.watermark.y+entry.watermark.height<=entry.height);
    assert.ok(entry.watermark.width*entry.watermark.height/(entry.width*entry.height)<0.05);
    assert.ok(Math.max(entry.width,entry.height)<=(entry===manifest.profile?384:1024));
    if(entry!==manifest.profile){
      assert.equal(entry.watermark.opacity,0.25);
      assert.equal(entry.watermark.alpha,64);
      assert.equal(entry.watermark.backgroundPanel,false);
      assert.ok(entry.watermark.x>=entry.width*0.1);
      assert.ok(entry.watermark.y>=entry.height*0.1);
      assert.ok(entry.watermark.x+entry.watermark.width<=entry.width*0.9);
      assert.ok(entry.watermark.y+entry.watermark.height<=entry.height*0.9);
    }
    for(const folder of [path.join(root,'public/artworks'),path.join(buildRoot,'artworks')]){
      const bytes=fs.readFileSync(path.join(folder,entry.filename));
      assert.equal(hash(bytes),entry.sha256,entry.filename);
      const dimensions=entry.filename.endsWith('.png')?pngInfo(bytes):jpegInfo(bytes);
      assert.deepEqual(dimensions,{width:entry.width,height:entry.height});
    }
  }
  const svg=fs.readFileSync(path.join(root,'public/artworks/artist-avatar.svg'));
  assert.equal(hash(svg),manifest.identitySvgSha256);
  const publicFiles=fs.readdirSync(path.join(root,'public/artworks')).sort();
  assert.deepEqual(publicFiles,[...manifest.artworks.map(entry=>entry.filename),manifest.profile.filename,'artist-avatar.svg'].sort());
  const sourceFiles=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?sourceFiles(path.join(dir,entry.name)):[path.join(dir,entry.name)]);
  for(const file of sourceFiles(path.join(root,'src')))assert.doesNotMatch(fs.readFileSync(file,'utf8'),privatePattern,file);
  assert.doesNotMatch(fs.readFileSync(path.join(root,'index.html'),'utf8'),privatePattern);
  // A future approved standalone checkout may have its own clean Git repository.
  // History isolation is audited during handoff, not by forbidding Git checkouts here.
  for(const name of ['originals','aurelia_stella_artworks_12','ARTIST_INFORMATION_INTEGRATION.md','ARTWORK_INTEGRATION.md'])assert.equal(fs.existsSync(path.join(root,name)),false);
  console.log('PASS: 12 watermarked derivative records plus profile; actual dimensions, hashes and metadata stripping verified in public/build.');
  console.log('PASS: Artwork watermark records specify approximately 25% opacity, no panel and at least 10% clearance from every image edge.');
  console.log('PASS: No originals/internal handoff reports or private artist data in the Portfolio snapshot.');
  console.log('Visual watermark review and actual browser responsive QA remain separate from component tests.');
})().catch(error=>{console.error(error);process.exitCode=1;});
