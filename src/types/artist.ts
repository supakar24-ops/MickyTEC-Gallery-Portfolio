export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  handle: string;
  iconName: 'twitter' | 'facebook';
}

export interface ArtistProfile {
  name: string;
  artistName: string;
  style: string;
  nameSub: string;
  title: string;
  tagline: string;
  bio: string;
  avatar: string;
  bannerImage: string;
  interests: string[];
  signatureColors: {
    name: string;
    hex: string;
    role: string;
    meaning: string;
  }[];
  socials: SocialLink[];
  stats: {
    label: string;
    value: string;
  }[];
}
