import { explainOutfitRecommendation } from './ai-client';
import { Garment, Outfit, OutfitRecommendation, UserStyleProfile } from './types';

interface OutfitRequest {
  garments: Garment[];
  outfits: Outfit[];
  profile: UserStyleProfile;
  selectedGarmentId?: string;
  occasion?: string;
  weatherSummary?: string;
  locationLabel?: string;
}

const scorePair = (a: Garment, b: Garment) => {
  let score = 0;
  if (a.category !== b.category) score += 2;
  if (a.formality === b.formality) score += 2;
  if (a.colorPrimary !== b.colorPrimary) score += 1;
  return score;
};

const seasonSignal = (weatherSummary?: string) => {
  const normalized = weatherSummary?.toLowerCase() ?? '';
  if (normalized.includes('cold') || normalized.includes('snow') || normalized.includes('freezing')) return 'winter';
  if (normalized.includes('hot') || normalized.includes('humid')) return 'summer';
  if (normalized.includes('rain') || normalized.includes('windy')) return 'fall';
  return 'all-season';
};

export async function generateOutfitRecommendations(input: OutfitRequest): Promise<OutfitRecommendation[]> {
  const seed = input.selectedGarmentId ? input.garments.find((g) => g.id === input.selectedGarmentId) : input.garments[0];
  if (!seed) return [];

  const targetSeason = seasonSignal(input.weatherSummary);

  const compatible = input.garments
    .filter((g) => g.id !== seed.id)
    .map((g) => ({
      garment: g,
      score: scorePair(seed, g)
        + (input.profile.preferredColors.includes(g.colorPrimary) ? 1 : 0)
        + (targetSeason === 'all-season' || g.seasonality === targetSeason || g.seasonality === 'all-season' ? 1 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.garment);

  const historyBoost = input.outfits.filter((o) => o.garmentIds.includes(seed.id)).flatMap((o) => o.garmentIds.filter((id) => id !== seed.id));
  const merged = [...new Set([seed.id, ...historyBoost, ...compatible.map((c) => c.id)])].slice(0, 4);

  const weatherContext = input.weatherSummary ? `Weather context: ${input.weatherSummary}.` : '';
  const locationContext = input.locationLabel ? `Location context: ${input.locationLabel}.` : '';
  const rationaleBase = `Built around ${seed.name} with a ${input.occasion ?? 'versatile'} direction and profile cues (${input.profile.styleKeywords.join(', ')}). ${locationContext} ${weatherContext}`.trim();
  const aiHint = await explainOutfitRecommendation(rationaleBase);

  return [
    {
      id: `or-${Date.now()}-1`,
      sourceGarmentIds: [seed.id],
      recommendedGarmentIds: merged,
      title: `${input.occasion ?? 'Everyday'} look anchored by ${seed.subcategory}`,
      rationale: `${rationaleBase} ${aiHint}`,
      occasion: input.occasion ?? 'everyday',
      aestheticTags: [...input.profile.styleKeywords.slice(0, 2), targetSeason],
      confidence: 0.74
    }
  ];
}
