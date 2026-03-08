'use client';

import { useState } from 'react';
import { RecommendationCard } from './RecommendationCard';
import { SectionHeader } from './SectionHeader';
import { generateOutfitRecommendations } from '@/lib/andthe/recommendation-engine';
import { useAndTheState } from '@/lib/andthe/use-andthe-state';
import { OutfitRecommendation } from '@/lib/andthe/types';

export function GenerateClient() {
  const { garments, outfits, profile, saveOutfit, isHydrated } = useAndTheState();
  const [selectedGarmentId, setSelectedGarmentId] = useState('');
  const [occasion, setOccasion] = useState('');
  const [results, setResults] = useState<OutfitRecommendation[]>([]);

  if (!isHydrated) return <p>Loading recommender…</p>;

  return (
    <div className="grid">
      <SectionHeader title="AI Outfit Recommendations" description="Combine wardrobe inventory + saved outfit history to generate net-new looks." />
      <div className="card row">
        <label>Build from garment
          <select value={selectedGarmentId} onChange={(e) => setSelectedGarmentId(e.target.value)}>
            <option value="">Pick anchor item</option>
            {garments.map((g) => <option value={g.id} key={g.id}>{g.name}</option>)}
          </select>
        </label>
        <label>Occasion<input className="input" value={occasion} onChange={(e) => setOccasion(e.target.value)} placeholder="office, date night..." /></label>
        <button className="btn primary" onClick={async () => setResults(await generateOutfitRecommendations({ garments, outfits, profile, selectedGarmentId: selectedGarmentId || undefined, occasion: occasion || undefined }))}>Generate</button>
      </div>
      <div className="grid cols-2">
        {results.map((rec) => (
          <RecommendationCard key={rec.id} rec={rec} garments={garments} onSaveDraft={(draft) => saveOutfit({
            id: `o-draft-${Date.now()}`,
            name: draft.title,
            image: garments.find((g) => g.id === draft.recommendedGarmentIds[0])?.image ?? '',
            garmentIds: draft.recommendedGarmentIds,
            occasionTags: [draft.occasion],
            seasonality: 'all-season',
            formality: 'smart-casual',
            notes: draft.rationale,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })} />
        ))}
      </div>
    </div>
  );
}
