import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ArtworkModal } from './components/common/ArtworkModal';

// Home Subsections
import { HeroSection } from './components/home/HeroSection';
import { StyleIntroSection } from './components/home/StyleIntroSection';
import { FeaturedArtworksSection } from './components/home/FeaturedArtworksSection';
import { SignaturePaletteSection } from './components/home/SignaturePaletteSection';
import { CommissionPreviewSection } from './components/home/CommissionPreviewSection';
import { ArtistBriefSection } from './components/home/ArtistBriefSection';

// Page Views
import { GallerySection } from './components/gallery/GallerySection';
import { CommissionSection } from './components/commission/CommissionSection';
import { AboutSection } from './components/about/AboutSection';
import { ContactSection } from './components/contact/ContactSection';

import { Artwork } from './types/artwork';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [initialCommissionTier, setInitialCommissionTier] = useState<string | undefined>(undefined);

  const handleInquireArtwork = () => {
    // Gallery groupings do not imply a confirmed commission package.
    setInitialCommissionTier(undefined);
    setActiveTab('commission');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCommissionWithTier = (tierId?: string) => {
    setInitialCommissionTier(tierId);
    setActiveTab('commission');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-canvas text-slate-100 flex flex-col font-sans selection:bg-fantasy-violet selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCommission={() => handleGoToCommissionWithTier()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-0">
            {/* 1. Hero Banner */}
            <HeroSection
              onExploreGallery={() => {
                setActiveTab('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreCommission={() => handleGoToCommissionWithTier()}
              onSelectArtwork={(art) => setSelectedArtwork(art)}
            />

            {/* 2. Style Intro */}
            <StyleIntroSection />

            {/* 3. Featured Artworks */}
            <FeaturedArtworksSection
              onSelectArtwork={(art) => setSelectedArtwork(art)}
              onViewAllGallery={() => {
                setActiveTab('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 4. Signature Color Palette */}
            <SignaturePaletteSection />

            {/* 5. Commission Categories Preview */}
            <CommissionPreviewSection
              onGoToCommission={handleGoToCommissionWithTier}
            />

            {/* 6. Artist Introduction Brief & Socials */}
            <ArtistBriefSection
              onLearnMoreAbout={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToContact={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activeTab === 'gallery' && (
          <GallerySection
            onSelectArtwork={(art) => setSelectedArtwork(art)}
            onInquireCategory={(cat) => handleGoToCommissionWithTier()}
          />
        )}

        {activeTab === 'commission' && (
          <CommissionSection
            key={initialCommissionTier || 'default'}
            initialTierId={initialCommissionTier}
          />
        )}

        {activeTab === 'about' && (
          <AboutSection
            onGoToContact={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToCommission={() => handleGoToCommissionWithTier()}
          />
        )}

        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Global Artwork Inspector Modal */}
      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onInquire={handleInquireArtwork}
      />

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
