'use client';

import Link from 'next/link';
import { useAndTheState } from '@/lib/andthe/use-andthe-state';
import { SectionHeader } from './SectionHeader';

export function AndTheHome() {
  const { garments, outfits, profile, isHydrated } = useAndTheState();
  if (!isHydrated) return <p>Loading anDThe…</p>;

  return (
    <div className="grid">
      <SectionHeader title="anDThe" description="Catalog your wardrobe, store complete outfits, generate AI-guided looks, and get shopping brand direction." />
      <div className="grid cols-3">
        <div className="card"><h3>{garments.length}</h3><small>Garments cataloged</small></div>
        <div className="card"><h3>{outfits.length}</h3><small>Outfits saved</small></div>
        <div className="card"><h3>{profile.favoriteBrands.length}</h3><small>Favorite brands tracked</small></div>
      </div>
      <div className="grid cols-3">
        <Link className="card" href="/andthe/capture"><h3>Closet Capture</h3><p>Use camera/upload to add single items or full outfits.</p></Link>
        <Link className="card" href="/andthe/wardrobe"><h3>Closet Catalog</h3><p>Search, filter, and manage individual pieces.</p></Link>
        <Link className="card" href="/andthe/outfits"><h3>Wardrobe (Outfits)</h3><p>Store and link complete looks.</p></Link>
        <Link className="card" href="/andthe/generate"><h3>AI Outfit Generator</h3><p>Create recommendations from your closet data.</p></Link>
        <Link className="card" href="/andthe/shop"><h3>Shopping Assistant</h3><p>Get brand direction for missing pieces.</p></Link>
        <Link className="card" href="/andthe/profile"><h3>Style Profile</h3><p>Tune preferences, sizing, fit, and budget.</p></Link>
      </div>
    </div>
  );
}
