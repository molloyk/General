import { describe, expect, it } from 'vitest';
import { sampleGarments, sampleOutfits, sampleProfile, mockBrandKnowledge } from '@/lib/andthe/mock-data';
import { generateOutfitRecommendations } from '@/lib/andthe/recommendation-engine';
import { generateBrandRecommendations } from '@/lib/andthe/shopping-recommendation-engine';

describe('andthe engines', () => {
  it('generates outfit recommendation from wardrobe context', async () => {
    const recs = await generateOutfitRecommendations({
      garments: sampleGarments,
      outfits: sampleOutfits,
      profile: sampleProfile,
      selectedGarmentId: sampleGarments[0].id,
      occasion: 'office'
    });
    expect(recs.length).toBeGreaterThan(0);
    expect(recs[0].recommendedGarmentIds.length).toBeGreaterThan(1);
  });

  it('generates brand recommendations for shopping intent', async () => {
    const recs = await generateBrandRecommendations({
      intent: {
        id: 'intent-1',
        itemQuery: 'white t-shirt',
        category: 'tops',
        budgetTier: 'mid-range',
        createdAt: new Date().toISOString()
      },
      profile: sampleProfile,
      brands: mockBrandKnowledge
    });
    expect(recs.length).toBeGreaterThan(0);
    expect(recs[0].brandName).toBeTruthy();
  });
});
