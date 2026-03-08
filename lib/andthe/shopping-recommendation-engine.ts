import { recommendBrandsForIntent } from './ai-client';
import { BrandProfile, BrandRecommendation, ShoppingIntent, UserStyleProfile } from './types';

interface ShoppingRequest {
  intent: ShoppingIntent;
  profile: UserStyleProfile;
  brands: BrandProfile[];
}

const budgetScore = (brandTier: string, userTier?: string) => (brandTier === userTier ? 2 : 0);

export async function generateBrandRecommendations({ intent, profile, brands }: ShoppingRequest): Promise<BrandRecommendation[]> {
  const ranked = brands
    .map((brand) => {
      let score = 0;
      score += brand.styleTags.filter((t) => profile.styleKeywords.some((s) => s.toLowerCase().includes(t.toLowerCase()))).length * 2;
      if (brand.categoryStrength.includes(intent.category ?? '')) score += 2;
      score += budgetScore(brand.priceTier, intent.budgetTier ?? profile.budgetTier);
      if (profile.favoriteBrands.includes(brand.name)) score += 3;
      if (profile.avoidedBrands.includes(brand.name)) score -= 5;
      return { brand, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const aiHint = await recommendBrandsForIntent(`${intent.itemQuery}; ${intent.styleNotes ?? ''}`);

  return ranked.map(({ brand, score }) => ({
    id: `br-${brand.id}-${Date.now()}`,
    brandName: brand.name,
    categoryStrength: brand.categoryStrength,
    priceTier: brand.priceTier,
    rationale: `${brand.positioning}. Fits request for ${intent.itemQuery} with score ${score}. ${aiHint}`,
    suggestedSearchTerms: [`${brand.name} ${intent.itemQuery}`, `${brand.name} ${intent.preferredColor ?? ''}`.trim()],
    notes: brand.notes
  }));
}
