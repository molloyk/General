import { sampleGarments, sampleOutfits, sampleProfile } from './mock-data';
import { Garment, Outfit, UserStyleProfile, AndTheData } from './types';

const KEY = 'andthe-v1';

const fallback: AndTheData = { garments: sampleGarments, outfits: sampleOutfits, profile: sampleProfile };

export function readStudioData(): AndTheData {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as AndTheData;
  } catch {
    return fallback;
  }
}

export function writeStudioData(data: AndTheData) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(data));
}

export const upsertGarment = (garments: Garment[], garment: Garment) => {
  const idx = garments.findIndex((g) => g.id === garment.id);
  if (idx === -1) return [garment, ...garments];
  return garments.map((g) => (g.id === garment.id ? garment : g));
};

export const upsertOutfit = (outfits: Outfit[], outfit: Outfit) => {
  const idx = outfits.findIndex((o) => o.id === outfit.id);
  if (idx === -1) return [outfit, ...outfits];
  return outfits.map((o) => (o.id === outfit.id ? outfit : o));
};

export const replaceProfile = (_profile: UserStyleProfile, next: UserStyleProfile) => next;
