import { BrandProfile, Garment, Outfit, UserStyleProfile } from './types';

const now = new Date().toISOString();

export const sampleProfile: UserStyleProfile = {
  id: 'profile-1',
  styleKeywords: ['elevated basics', 'minimal', 'smart casual'],
  favoriteBrands: ['COS', 'Uniqlo', 'A.P.C.'],
  avoidedBrands: ['LogoMax'],
  budgetTier: 'mid-range',
  preferredFits: ['relaxed', 'tailored'],
  preferredColors: ['white', 'olive', 'navy', 'charcoal'],
  avoidedColors: ['neon'],
  sizes: { tops: 'M', bottoms: '32', outerwear: 'M', footwear: '10' },
  occasionTendencies: ['office', 'dinner', 'weekend city'],
  notes: 'Prefers no loud logos and values fabric quality.'
};

export const sampleGarments: Garment[] = [
  { id: 'g1', name: 'White Oxford Shirt', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80', category: 'tops', subcategory: 'shirt', colorPrimary: 'white', brand: 'Uniqlo', size: 'M', fit: 'regular', fabric: 'cotton', seasonality: 'all-season', formality: 'business-casual', tags: ['office', 'staple'], createdAt: now, updatedAt: now },
  { id: 'g2', name: 'Navy Pleated Trousers', image: 'https://images.unsplash.com/photo-1593032465171-8bd96a9ac9a1?auto=format&fit=crop&w=900&q=80', category: 'bottoms', subcategory: 'trousers', colorPrimary: 'navy', brand: 'COS', size: '32', fit: 'relaxed', seasonality: 'all-season', formality: 'smart-casual', tags: ['tailored'], createdAt: now, updatedAt: now },
  { id: 'g3', name: 'Minimal White Sneakers', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80', category: 'footwear', subcategory: 'sneakers', colorPrimary: 'white', brand: 'Common Projects', size: '10', fit: 'standard', seasonality: 'all-season', formality: 'casual', tags: ['clean'], createdAt: now, updatedAt: now },
  { id: 'g4', name: 'Olive Utility Jacket', image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=900&q=80', category: 'outerwear', subcategory: 'field jacket', colorPrimary: 'olive', brand: 'Buck Mason', size: 'M', fit: 'relaxed', seasonality: 'fall', formality: 'casual', tags: ['weekend'], createdAt: now, updatedAt: now },
  { id: 'g5', name: 'Charcoal Merino Knit', image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=900&q=80', category: 'tops', subcategory: 'sweater', colorPrimary: 'charcoal', brand: 'Arket', size: 'M', fit: 'regular', seasonality: 'winter', formality: 'smart-casual', tags: ['layering'], createdAt: now, updatedAt: now }
];

export const sampleOutfits: Outfit[] = [
  { id: 'o1', name: 'Client Lunch Uniform', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80', garmentIds: ['g1', 'g2', 'g3'], occasionTags: ['office', 'lunch'], seasonality: 'spring', formality: 'smart-casual', rating: 5, favorite: true, createdAt: now, updatedAt: now },
  { id: 'o2', name: 'Weekend Coffee', image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=900&q=80', garmentIds: ['g5', 'g2', 'g4', 'g3'], occasionTags: ['weekend'], seasonality: 'fall', formality: 'casual', createdAt: now, updatedAt: now }
];

export const mockBrandKnowledge: BrandProfile[] = [
  { id: 'b1', name: 'Uniqlo', styleTags: ['minimal', 'basics', 'functional'], priceTier: 'budget', categoryStrength: ['tops', 'knitwear', 'outerwear'], positioning: 'Affordable technical basics', notes: 'Great for layering essentials.' },
  { id: 'b2', name: 'COS', styleTags: ['minimal', 'architectural', 'smart casual'], priceTier: 'mid-range', categoryStrength: ['trousers', 'outerwear', 'shirts'], positioning: 'Modern elevated silhouettes', notes: 'Strong for clean tailoring.' },
  { id: 'b3', name: 'A.P.C.', styleTags: ['french', 'minimal', 'denim'], priceTier: 'premium', categoryStrength: ['denim', 'outerwear', 'tees'], positioning: 'Contemporary Parisian staples', notes: 'Low-logo wardrobe builders.' },
  { id: 'b4', name: 'Buck Mason', styleTags: ['americana', 'rugged', 'basics'], priceTier: 'mid-range', categoryStrength: ['tees', 'outerwear', 'denim'], positioning: 'Refined casual core pieces', notes: 'Reliable elevated basics for menswear.' },
  { id: 'b5', name: 'Theory', styleTags: ['tailored', 'office', 'sleek'], priceTier: 'premium', categoryStrength: ['suiting', 'trousers', 'shirts'], positioning: 'Polished workwear wardrobe', notes: 'Great for business-casual capsules.' },
  { id: 'b6', name: 'Zegna', styleTags: ['luxury', 'tailoring', 'quiet luxury'], priceTier: 'luxury', categoryStrength: ['suiting', 'outerwear', 'knitwear'], positioning: 'High-end Italian luxury', notes: 'For premium tailoring investments.' }
];
