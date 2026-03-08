'use client';

import { FORMALITIES, PLACEHOLDER_IMAGE, SEASONS } from '@/lib/andthe/constants';
import { Garment, Outfit } from '@/lib/andthe/types';

export function OutfitForm({ initial, garments, onSave, onCancel }: { initial?: Outfit; garments: Garment[]; onSave: (outfit: Outfit) => void; onCancel: () => void }) {
  const current = initial ?? {
    id: `o-${Date.now()}`,
    name: '', image: PLACEHOLDER_IMAGE, garmentIds: [], occasionTags: [], seasonality: 'all-season', formality: 'casual',
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
  } as Outfit;

  return (
    <form className="card" action={(fd) => {
      const garmentIds = garments.filter((g) => fd.get(g.id) === 'on').map((g) => g.id);
      onSave({
        ...current,
        name: String(fd.get('name') || ''),
        image: String(fd.get('image') || PLACEHOLDER_IMAGE),
        seasonality: String(fd.get('seasonality') || 'all-season') as Outfit['seasonality'],
        formality: String(fd.get('formality') || 'casual') as Outfit['formality'],
        occasionTags: String(fd.get('occasionTags') || '').split(',').map((x) => x.trim()).filter(Boolean),
        notes: String(fd.get('notes') || '') || undefined,
        garmentIds,
        updatedAt: new Date().toISOString()
      });
    }}>
      <h3>{initial ? 'Edit outfit' : 'Add outfit'}</h3>
      <div className="grid cols-3">
        <label>Name<input className="input" name="name" defaultValue={current.name} required /></label>
        <label>Image URL<input className="input" name="image" defaultValue={current.image} /></label>
        <label>Occasion tags<input className="input" name="occasionTags" defaultValue={current.occasionTags.join(', ')} /></label>
        <label>Season<select name="seasonality" defaultValue={current.seasonality}>{SEASONS.map((s) => <option key={s}>{s}</option>)}</select></label>
        <label>Formality<select name="formality" defaultValue={current.formality}>{FORMALITIES.map((f) => <option key={f}>{f}</option>)}</select></label>
      </div>
      <label>Notes<textarea name="notes" defaultValue={current.notes} /></label>
      <h4>Link garments</h4>
      <div className="grid cols-3">
        {garments.map((g) => (
          <label key={g.id}><input type="checkbox" name={g.id} defaultChecked={current.garmentIds.includes(g.id)} /> {g.name}</label>
        ))}
      </div>
      <div className="row"><button className="btn primary" type="submit">Save outfit</button><button className="btn" type="button" onClick={onCancel}>Cancel</button></div>
    </form>
  );
}
