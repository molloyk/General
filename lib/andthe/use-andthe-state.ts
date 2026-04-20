'use client';

import { useEffect, useMemo, useState } from 'react';
import { readStudioData, replaceProfile, upsertGarment, upsertOutfit, writeStudioData } from './storage';
import { Garment, Outfit, UserStyleProfile, AndTheData } from './types';

const emptyData: AndTheData = { garments: [], outfits: [], profile: {
  id: 'profile-empty',
  styleKeywords: [],
  favoriteBrands: [],
  avoidedBrands: [],
  budgetTier: 'mid-range',
  preferredFits: [],
  preferredColors: [],
  avoidedColors: [],
  preferredSilhouettes: [],
  preferredMaterials: [],
  avoidedMaterials: [],
  preferredBrandOrigins: [],
  prioritizeAmericanMade: false,
  climateNotes: '',
  homeLocationLabel: '',
  sizes: { tops: '', bottoms: '', outerwear: '', footwear: '' },
  occasionTendencies: [],
  notes: ''
} };

export function useAndTheState() {
  const [data, setData] = useState<AndTheData>(emptyData);
  const [isHydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(readStudioData());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) writeStudioData(data);
  }, [data, isHydrated]);

  const actions = useMemo(() => ({
    saveGarment: (garment: Garment) => setData((prev) => ({ ...prev, garments: upsertGarment(prev.garments, garment) })),
    deleteGarment: (id: string) => setData((prev) => ({ ...prev, garments: prev.garments.filter((g) => g.id !== id), outfits: prev.outfits.map((o) => ({ ...o, garmentIds: o.garmentIds.filter((gid) => gid !== id) })) })),
    saveOutfit: (outfit: Outfit) => setData((prev) => ({ ...prev, outfits: upsertOutfit(prev.outfits, outfit) })),
    deleteOutfit: (id: string) => setData((prev) => ({ ...prev, outfits: prev.outfits.filter((o) => o.id !== id) })),
    saveProfile: (nextProfile: UserStyleProfile) => setData((prev) => ({ ...prev, profile: replaceProfile(prev.profile, nextProfile) }))
  }), []);

  return { ...data, ...actions, isHydrated };
}
