'use client';

import { SectionHeader } from './SectionHeader';
import { BUDGET_TIERS } from '@/lib/andthe/constants';
import { useAndTheState } from '@/lib/andthe/use-andthe-state';

const toList = (value: FormDataEntryValue | null) => String(value || '').split(',').map((x) => x.trim()).filter(Boolean);

export function ProfileClient() {
  const { profile, saveProfile, isHydrated } = useAndTheState();
  if (!isHydrated) return <p>Loading profile…</p>;

  return (
    <div className="grid">
      <SectionHeader title="User Style Profile" description="Identity + preference graph for fit, brands, origins, and recommendation behavior." />
      <form className="card" action={(fd) => saveProfile({
        ...profile,
        styleKeywords: toList(fd.get('styleKeywords')),
        favoriteBrands: toList(fd.get('favoriteBrands')),
        avoidedBrands: toList(fd.get('avoidedBrands')),
        budgetTier: String(fd.get('budgetTier') || 'mid-range') as typeof profile.budgetTier,
        preferredFits: toList(fd.get('preferredFits')),
        preferredColors: toList(fd.get('preferredColors')),
        avoidedColors: toList(fd.get('avoidedColors')),
        preferredSilhouettes: toList(fd.get('preferredSilhouettes')),
        preferredMaterials: toList(fd.get('preferredMaterials')),
        avoidedMaterials: toList(fd.get('avoidedMaterials')),
        preferredBrandOrigins: toList(fd.get('preferredBrandOrigins')),
        prioritizeAmericanMade: fd.get('prioritizeAmericanMade') === 'on',
        climateNotes: String(fd.get('climateNotes') || ''),
        homeLocationLabel: String(fd.get('homeLocationLabel') || '') || undefined,
        occasionTendencies: toList(fd.get('occasionTendencies')),
        sizes: {
          tops: String(fd.get('tops') || ''),
          bottoms: String(fd.get('bottoms') || ''),
          outerwear: String(fd.get('outerwear') || ''),
          footwear: String(fd.get('footwear') || '')
        },
        notes: String(fd.get('notes') || '')
      })}>
        <h3>Identity + sizing</h3>
        <div className="grid cols-3">
          <label>Home location<input className="input" name="homeLocationLabel" defaultValue={profile.homeLocationLabel} placeholder="Austin, TX" /></label>
          <label>Tops size<input className="input" name="tops" defaultValue={profile.sizes.tops} /></label>
          <label>Bottoms size<input className="input" name="bottoms" defaultValue={profile.sizes.bottoms} /></label>
          <label>Outerwear size<input className="input" name="outerwear" defaultValue={profile.sizes.outerwear} /></label>
          <label>Footwear size<input className="input" name="footwear" defaultValue={profile.sizes.footwear} /></label>
          <label>Budget<select name="budgetTier" defaultValue={profile.budgetTier}>{BUDGET_TIERS.map((b) => <option key={b}>{b}</option>)}</select></label>
        </div>

        <h3>Style + fit preferences</h3>
        <div className="grid cols-3">
          <label>Style keywords<input className="input" name="styleKeywords" defaultValue={profile.styleKeywords.join(', ')} /></label>
          <label>Preferred fits<input className="input" name="preferredFits" defaultValue={profile.preferredFits.join(', ')} /></label>
          <label>Preferred silhouettes<input className="input" name="preferredSilhouettes" defaultValue={profile.preferredSilhouettes.join(', ')} placeholder="baggy denim, cropped outerwear" /></label>
          <label>Preferred colors<input className="input" name="preferredColors" defaultValue={profile.preferredColors.join(', ')} /></label>
          <label>Avoided colors<input className="input" name="avoidedColors" defaultValue={profile.avoidedColors.join(', ')} /></label>
          <label>Occasion tendencies<input className="input" name="occasionTendencies" defaultValue={profile.occasionTendencies.join(', ')} /></label>
          <label>Preferred materials<input className="input" name="preferredMaterials" defaultValue={profile.preferredMaterials.join(', ')} /></label>
          <label>Avoided materials<input className="input" name="avoidedMaterials" defaultValue={profile.avoidedMaterials.join(', ')} /></label>
          <label>Climate notes<input className="input" name="climateNotes" defaultValue={profile.climateNotes} placeholder="warm winters, humid summers" /></label>
        </div>

        <h3>Brand preferences</h3>
        <div className="grid cols-3">
          <label>Favorite brands<input className="input" name="favoriteBrands" defaultValue={profile.favoriteBrands.join(', ')} /></label>
          <label>Avoided brands<input className="input" name="avoidedBrands" defaultValue={profile.avoidedBrands.join(', ')} /></label>
          <label>Preferred brand origins<input className="input" name="preferredBrandOrigins" defaultValue={profile.preferredBrandOrigins.join(', ')} placeholder="United States, Japan" /></label>
          <label>
            <input type="checkbox" name="prioritizeAmericanMade" defaultChecked={profile.prioritizeAmericanMade} /> Prioritize American-made where possible
          </label>
        </div>

        <label>Profile notes<textarea name="notes" defaultValue={profile.notes} /></label>
        <button className="btn primary" type="submit">Save profile</button>
      </form>
    </div>
  );
}
