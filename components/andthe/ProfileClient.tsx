'use client';

import { SectionHeader } from './SectionHeader';
import { BUDGET_TIERS } from '@/lib/andthe/constants';
import { useAndTheState } from '@/lib/andthe/use-andthe-state';

export function ProfileClient() {
  const { profile, saveProfile, isHydrated } = useAndTheState();
  if (!isHydrated) return <p>Loading profile…</p>;

  return (
    <div className="grid">
      <SectionHeader title="User Style Profile" description="Preferences used by outfit and shopping recommendation engines." />
      <form className="card" action={(fd) => saveProfile({
        ...profile,
        styleKeywords: String(fd.get('styleKeywords') || '').split(',').map((x) => x.trim()).filter(Boolean),
        favoriteBrands: String(fd.get('favoriteBrands') || '').split(',').map((x) => x.trim()).filter(Boolean),
        avoidedBrands: String(fd.get('avoidedBrands') || '').split(',').map((x) => x.trim()).filter(Boolean),
        budgetTier: String(fd.get('budgetTier') || 'mid-range') as typeof profile.budgetTier,
        preferredFits: String(fd.get('preferredFits') || '').split(',').map((x) => x.trim()).filter(Boolean),
        preferredColors: String(fd.get('preferredColors') || '').split(',').map((x) => x.trim()).filter(Boolean),
        avoidedColors: String(fd.get('avoidedColors') || '').split(',').map((x) => x.trim()).filter(Boolean),
        occasionTendencies: String(fd.get('occasionTendencies') || '').split(',').map((x) => x.trim()).filter(Boolean),
        sizes: {
          tops: String(fd.get('tops') || ''), bottoms: String(fd.get('bottoms') || ''), outerwear: String(fd.get('outerwear') || ''), footwear: String(fd.get('footwear') || '')
        },
        notes: String(fd.get('notes') || '')
      })}>
        <div className="grid cols-3">
          <label>Style keywords<input className="input" name="styleKeywords" defaultValue={profile.styleKeywords.join(', ')} /></label>
          <label>Favorite brands<input className="input" name="favoriteBrands" defaultValue={profile.favoriteBrands.join(', ')} /></label>
          <label>Avoided brands<input className="input" name="avoidedBrands" defaultValue={profile.avoidedBrands.join(', ')} /></label>
          <label>Budget<select name="budgetTier" defaultValue={profile.budgetTier}>{BUDGET_TIERS.map((b) => <option key={b}>{b}</option>)}</select></label>
          <label>Preferred fits<input className="input" name="preferredFits" defaultValue={profile.preferredFits.join(', ')} /></label>
          <label>Preferred colors<input className="input" name="preferredColors" defaultValue={profile.preferredColors.join(', ')} /></label>
          <label>Avoided colors<input className="input" name="avoidedColors" defaultValue={profile.avoidedColors.join(', ')} /></label>
          <label>Occasion tendencies<input className="input" name="occasionTendencies" defaultValue={profile.occasionTendencies.join(', ')} /></label>
          <label>Tops size<input className="input" name="tops" defaultValue={profile.sizes.tops} /></label>
          <label>Bottoms size<input className="input" name="bottoms" defaultValue={profile.sizes.bottoms} /></label>
          <label>Outerwear size<input className="input" name="outerwear" defaultValue={profile.sizes.outerwear} /></label>
          <label>Footwear size<input className="input" name="footwear" defaultValue={profile.sizes.footwear} /></label>
        </div>
        <label>Notes<textarea name="notes" defaultValue={profile.notes} /></label>
        <button className="btn primary" type="submit">Save profile</button>
      </form>
    </div>
  );
}
