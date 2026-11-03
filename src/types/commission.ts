export type CommissionTierId = 'bust-up' | 'half-body' | 'full-body';

export interface CommissionTier {
  id: CommissionTierId;
  title: string;
  subtitle: string;
  description: string;
  priceThb: number;
  sampleImage: string;
  sampleAlt: string;
}
