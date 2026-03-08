import { Garment, Outfit } from './types';

export function mapOutfitGarments(outfit: Outfit, garments: Garment[]) {
  return garments.filter((g) => outfit.garmentIds.includes(g.id));
}
