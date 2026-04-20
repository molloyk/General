export type BudgetTier = 'budget' | 'mid-range' | 'premium' | 'luxury';
export type Seasonality = 'spring' | 'summer' | 'fall' | 'winter' | 'all-season';
export type Formality = 'casual' | 'smart-casual' | 'business-casual' | 'formal';

export interface UserStyleProfile {
  id: string;
  styleKeywords: string[];
  favoriteBrands: string[];
  avoidedBrands: string[];
  budgetTier: BudgetTier;
  preferredFits: string[];
  preferredColors: string[];
  avoidedColors: string[];
  preferredSilhouettes: string[];
  preferredMaterials: string[];
  avoidedMaterials: string[];
  preferredBrandOrigins: string[];
  prioritizeAmericanMade: boolean;
  climateNotes: string;
  homeLocationLabel?: string;
  sizes: { tops: string; bottoms: string; outerwear: string; footwear: string };
  occasionTendencies: string[];
  notes: string;
}

export interface Garment {
  id: string;
  name: string;
  image: string;
  category: string;
  subcategory: string;
  colorPrimary: string;
  colorSecondary?: string;
  brand: string;
  size: string;
  fit: string;
  fabric?: string;
  seasonality: Seasonality;
  formality: Formality;
  tags: string[];
  notes?: string;
  price?: number;
  purchaseDate?: string;
  favorite?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Outfit {
  id: string;
  name: string;
  image: string;
  garmentIds: string[];
  occasionTags: string[];
  seasonality: Seasonality;
  formality: Formality;
  notes?: string;
  rating?: number;
  favorite?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingIntent {
  id: string;
  itemQuery: string;
  category?: string;
  preferredColor?: string;
  fitPreferences?: string;
  budgetTier?: BudgetTier;
  styleNotes?: string;
  excludedFeatures?: string[];
  createdAt: string;
}

export interface OutfitRecommendation {
  id: string;
  sourceGarmentIds: string[];
  recommendedGarmentIds: string[];
  title: string;
  rationale: string;
  occasion: string;
  aestheticTags: string[];
  confidence?: number;
}

export interface BrandRecommendation {
  id: string;
  brandName: string;
  categoryStrength: string[];
  priceTier: BudgetTier;
  rationale: string;
  suggestedSearchTerms?: string[];
  notes?: string;
}

export interface BrandProfile {
  id: string;
  name: string;
  styleTags: string[];
  fitTags: string[];
  preferredMaterialTags: string[];
  originCountry: string;
  madeInUSA?: boolean;
  priceTier: BudgetTier;
  categoryStrength: string[];
  positioning: string;
  notes: string;
}

export interface AndTheData {
  garments: Garment[];
  outfits: Outfit[];
  profile: UserStyleProfile;
}
