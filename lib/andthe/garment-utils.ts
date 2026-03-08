import { Garment } from './types';

export interface GarmentFilters {
  query: string;
  category: string;
  color: string;
  brand: string;
  seasonality: string;
  formality: string;
}

export function filterGarments(garments: Garment[], filters: GarmentFilters) {
  return garments.filter((g) => {
    const q = filters.query.trim().toLowerCase();
    const matchesQuery = !q || [g.name, g.brand, g.subcategory, g.tags.join(' ')].join(' ').toLowerCase().includes(q);
    const matchesCategory = !filters.category || g.category === filters.category;
    const matchesColor = !filters.color || [g.colorPrimary, g.colorSecondary ?? ''].join(' ').toLowerCase().includes(filters.color.toLowerCase());
    const matchesBrand = !filters.brand || g.brand === filters.brand;
    const matchesSeason = !filters.seasonality || g.seasonality === filters.seasonality;
    const matchesFormality = !filters.formality || g.formality === filters.formality;
    return matchesQuery && matchesCategory && matchesColor && matchesBrand && matchesSeason && matchesFormality;
  });
}
