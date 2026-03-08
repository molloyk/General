'use client';

import { useState } from 'react';
import { BrandRecommendationCard } from './BrandRecommendationCard';
import { SectionHeader } from './SectionHeader';
import { BUDGET_TIERS } from '@/lib/andthe/constants';
import { mockBrandKnowledge } from '@/lib/andthe/mock-data';
import { generateBrandRecommendations } from '@/lib/andthe/shopping-recommendation-engine';
import { useAndTheState } from '@/lib/andthe/use-andthe-state';
import { BrandRecommendation, ShoppingIntent } from '@/lib/andthe/types';

export function ShopAssistantClient() {
  const { profile, isHydrated } = useAndTheState();
  const [results, setResults] = useState<BrandRecommendation[]>([]);
  if (!isHydrated) return <p>Loading shopping assistant…</p>;

  return (
    <div className="grid">
      <SectionHeader title="Shopping Assistant" description="Describe what you need and get brand-level guidance aligned to your profile." />
      <form className="card" action={async (fd) => {
        const intent: ShoppingIntent = {
          id: `intent-${Date.now()}`,
          itemQuery: String(fd.get('itemQuery') || ''),
          category: String(fd.get('category') || '') || undefined,
          preferredColor: String(fd.get('preferredColor') || '') || undefined,
          fitPreferences: String(fd.get('fitPreferences') || '') || undefined,
          budgetTier: String(fd.get('budgetTier') || '') as ShoppingIntent['budgetTier'],
          styleNotes: String(fd.get('styleNotes') || '') || undefined,
          excludedFeatures: String(fd.get('excludedFeatures') || '').split(',').map((x) => x.trim()).filter(Boolean),
          createdAt: new Date().toISOString()
        };
        setResults(await generateBrandRecommendations({ intent, profile, brands: mockBrandKnowledge }));
      }}>
        <div className="grid cols-3">
          <label>Item query<input className="input" name="itemQuery" placeholder="white t-shirt" required /></label>
          <label>Category<input className="input" name="category" placeholder="tops" /></label>
          <label>Preferred color<input className="input" name="preferredColor" /></label>
          <label>Fit<input className="input" name="fitPreferences" /></label>
          <label>Budget<select name="budgetTier" defaultValue={profile.budgetTier}>{BUDGET_TIERS.map((b) => <option key={b}>{b}</option>)}</select></label>
          <label>Excluded features<input className="input" name="excludedFeatures" placeholder="large logos" /></label>
        </div>
        <label>Style notes<textarea name="styleNotes" placeholder="no logo, soft hand feel..." /></label>
        <button className="btn primary" type="submit">Recommend brands</button>
      </form>
      <div className="grid cols-2">{results.map((r) => <BrandRecommendationCard key={r.id} recommendation={r} />)}</div>
    </div>
  );
}
