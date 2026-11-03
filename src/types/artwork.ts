export type ArtworkCategory = 'all' | 'full-body' | 'half-body' | 'character-design';

export interface Artwork {
  id: string;
  title: string;
  alt: string;
  originalTitle?: string;
  category: Exclude<ArtworkCategory, 'all'>;
  categoryLabel: string;
  image: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  year?: string;
  medium?: string;
  dimension: string;
  description: string;
  tags: string[];
  featured: boolean;
  colorPalette: string[];
  characterName?: string;
}
