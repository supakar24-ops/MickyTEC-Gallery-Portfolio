// Asset integrity and component checks without installing a test framework.
// These checks do not replace browser layout or real DOM interaction tests.
(async () => {
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
// lucide-react publishes an ESM package; reuse its ESM exports in this CJS harness.
const iconModule = new (require('node:module'))(require.resolve('lucide-react'));
iconModule.exports = await import('lucide-react');
iconModule.loaded = true;
require.cache[require.resolve('lucide-react')] = iconModule;

for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => {
    const source = fs.readFileSync(filename, 'utf8');
    module._compile(ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
      fileName: filename,
    }).outputText, filename);
  };
}

const { artworksData } = require('../src/data/artworks.ts');
const { GallerySection } = require('../src/components/gallery/GallerySection.tsx');
const { FeaturedArtworksSection } = require('../src/components/home/FeaturedArtworksSection.tsx');
const { HeroSection } = require('../src/components/home/HeroSection.tsx');
const { ArtworkModal } = require('../src/components/common/ArtworkModal.tsx');
const { commissionTiersData } = require('../src/data/commissions.ts');
const { CommissionPreviewSection } = require('../src/components/home/CommissionPreviewSection.tsx');
const originalHooks = { useState: React.useState, useRef: React.useRef, useEffect: React.useEffect };
const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const walkFiles = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const filename = path.join(dir, entry.name);
  return entry.isDirectory() ? walkFiles(filename) : [filename];
});
const walkElements = (element, predicate) => {
  if (Array.isArray(element)) return element.flatMap((child) => walkElements(child, predicate));
  if (!React.isValidElement(element)) return [];
  return [ ...(predicate(element) ? [element] : []), ...walkElements(element.props.children, predicate) ];
};
const manifest = require('../tests/fixtures/portfolio-assets.json').artworks;
const buildRoot = path.resolve(process.env.MICKYTEC_BUILD_DIR || path.join(root, 'dist'));
assert.equal(manifest.length, 12);
assert.equal(new Set(manifest.map(entry => entry.sha256)).size, 12);
assert.equal(artworksData.length, 12);
assert.equal(new Set(artworksData.map((art) => art.id)).size, 12);
assert.equal(new Set(artworksData.map((art) => art.image)).size, 12);
assert.ok(artworksData.every((art) => ['full-body', 'half-body', 'character-design'].includes(art.category)));
assert.deepEqual(artworksData.map((art) => Number(art.id.slice(4))), [11, 9, 5, 7, 2, 8, 6, 10, 3, 12, 1, 4]);
for (const art of artworksData) {
  const entry = manifest.find((item) => item.filename === path.basename(art.image));
  assert.ok(entry, art.image);

  for (const folder of [path.join(root, 'public'), buildRoot]) assert.equal(entry.sha256.toLowerCase(), hash(path.join(folder, art.image)), art.image);
  for (const key of ['year', 'medium', 'originalTitle', 'characterName']) assert.equal(art[key], undefined);
  assert.match(art.title, /^ผลงาน \d{2}$/);
  assert.ok(art.alt);
  assert.equal(art.dimension, `${entry.width} × ${entry.height} px`);
}
console.log('PASS: 12 unique artworks; public and production copies match the Portfolio derivative manifest; neutral metadata.');

try {
  // Exercise filter handlers and render again with the state they set.
  let category = 'all';
  React.useState = () => [category, (value) => { category = value; }];
  const initialGallery = GallerySection({ onSelectArtwork() {} });
  assert.deepEqual(walkElements(initialGallery, (el) => el.type === 'button').map((el) => el.key), ['all', 'full-body', 'half-body', 'character-design']);
  assert.doesNotMatch(renderToStaticMarkup(initialGallery), /chibi|จิบิ/i);
  for (const [id, count] of [['all', 12], ['full-body', 2], ['half-body', 7], ['character-design', 3]]) {
    let tree = GallerySection({ onSelectArtwork() {} });
    walkElements(tree, (el) => el.type === 'button' && el.key === id)[0].props.onClick();
    tree = GallerySection({ onSelectArtwork() {} });
    const images = walkElements(tree, (el) => el.type === 'img');
    assert.equal(images.length, count);
    const expected = id === 'all' ? artworksData : artworksData.filter((art) => art.category === id);
    assert.deepEqual(images.map((el) => el.props.src), expected.map((art) => art.image));
    const active = walkElements(tree, (el) => el.type === 'button' && el.props['aria-pressed']);
    assert.equal(active.length, 1);
  }
  console.log('PASS: All four filters, correct images/counts and active state; no Chibi filter or artwork assignments.');

  category = 'all';
  let selected;
  const gallery = GallerySection({ onSelectArtwork(art) { selected = art; } });
  const cards = walkElements(gallery, (el) => el.props.role === 'button');
  cards.forEach((card, index) => {
    card.props.onClick();
    assert.equal(selected, artworksData[index]);
    selected = null;
    card.props.onKeyDown({ key: 'Enter', preventDefault() {} });
    assert.equal(selected, artworksData[index]);
    selected = null;
    card.props.onKeyDown({ key: ' ', preventDefault() {} });
    assert.equal(selected, artworksData[index]);
  });
  const featured = FeaturedArtworksSection({ onSelectArtwork(art) { selected = art; } });
  const featuredImages = walkElements(featured, (el) => el.type === 'img');
  assert.deepEqual(featuredImages.map((el) => el.props.src), artworksData.filter((art) => art.featured).map((art) => art.image));
  walkElements(featured, (el) => el.props.role === 'button').forEach((card, index) => {
    card.props.onClick();
    assert.equal(selected, artworksData.filter((art) => art.featured)[index]);
  });
  const hero = HeroSection({ onSelectArtwork(art) { selected = art; } });
  assert.equal(walkElements(hero, (el) => el.type === 'img')[0].props.src, artworksData[0].image);
  walkElements(hero, (el) => el.props.role === 'button')[0].props.onClick();
  assert.equal(selected, artworksData[0]);
  for (const tree of [gallery, featured, hero]) {
    for (const img of walkElements(tree, (el) => el.type === 'img')) assert.match(img.props.className, /object-contain/);
  }
  console.log('PASS: Gallery click/Enter/Space handlers for all 12 images; Featured and Hero use real images and open the matching artwork.');
  for (const tier of commissionTiersData) {
    assert.ok(artworksData.some((art) => art.image === tier.sampleImage));
  }
  const preview = CommissionPreviewSection({ onGoToCommission() {} });
  assert.equal(walkElements(preview, (el) => el.type === 'img').length, 3);
  console.log('PASS: All three confirmed Commission packages use existing real gallery images.');

  // Minimal DOM objects check effect cleanup, keyboard handling and focus cycling.
  // Browser rendering, scrolling and real focus behavior require a browser separately.
  const effects = [];
  const originalDocument = global.document;
  const originalWindow = global.window;
  const originalHTMLElement = global.HTMLElement;
  class Element { focus() { document.activeElement = this; } }
  const previous = new Element();
  const first = new Element();
  const last = new Element();
  let keyHandler;
  global.HTMLElement = Element;
  global.document = { activeElement: previous, body: { style: { overflow: 'auto' } } };
  global.window = { addEventListener(name, handler) { keyHandler = handler; }, removeEventListener(name, handler) { assert.equal(keyHandler, handler); keyHandler = null; } };
  let refs = 0;
  React.useRef = () => ({ current: refs++ % 2 === 0 ? { querySelectorAll: () => [first, last] } : first });
  React.useEffect = (effect) => effects.push(effect);
  try {
    for (const art of artworksData) {
      let closes = 0;
      let inquiry;
      const tree = ArtworkModal({ artwork: art, onClose() { closes++; }, onInquire(value) { inquiry = value; } });
      const dialog = walkElements(tree, (el) => el.props.role === 'dialog')[0];
      assert.equal(dialog.props['aria-modal'], 'true');
      assert.equal(walkElements(tree, (el) => el.type === 'img')[0].props.src, art.image);
      assert.match(renderToStaticMarkup(tree), new RegExp(art.dimension));
      const cleanup = effects.pop()();
      assert.equal(document.body.style.overflow, 'hidden');
      assert.equal(document.activeElement, first);
      keyHandler({ key: 'Tab', shiftKey: true, preventDefault() {} });
      assert.equal(document.activeElement, last);
      keyHandler({ key: 'Tab', shiftKey: false, preventDefault() {} });
      assert.equal(document.activeElement, first);
      keyHandler({ key: 'Escape' });
      assert.equal(closes, 1);
      walkElements(tree, (el) => el.type === 'button' && el.props['aria-label'] === 'Close modal')[0].props.onClick();
      assert.equal(closes, 2);
      walkElements(tree, (el) => el.type === 'div' && el.props.className === 'absolute inset-0')[0].props.onClick();
      assert.equal(closes, 3);
      walkElements(tree, (el) => el.type === 'button' && !el.props['aria-label'])[0].props.onClick();
      assert.equal(inquiry, art);
      cleanup();
      assert.equal(document.body.style.overflow, 'auto');
      assert.equal(document.activeElement, previous);
    }
    assert.equal(ArtworkModal({ artwork: null }), null);
  } finally {
    global.document = originalDocument;
    global.window = originalWindow;
    global.HTMLElement = originalHTMLElement;
  }
  console.log('PASS: Lightbox renders all 12; close/backdrop/Escape/inquiry handlers and simulated focus/scroll cleanup.');
} finally {
  Object.assign(React, originalHooks);
}
console.log('Browser visual QA remains separate; no browser was available in this session.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
