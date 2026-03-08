'use client';

import { CATEGORIES, FORMALITIES, PLACEHOLDER_IMAGE, SEASONS } from '@/lib/andthe/constants';
import { Garment } from '@/lib/andthe/types';

export function GarmentForm({ initial, onSave, onCancel }: { initial?: Garment; onSave: (garment: Garment) => void; onCancel: () => void }) {
  const current = initial ?? {
    id: `g-${Date.now()}`,
    name: '', image: PLACEHOLDER_IMAGE, category: 'tops', subcategory: '', colorPrimary: '', brand: '', size: '', fit: '',
    seasonality: 'all-season', formality: 'casual', tags: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
  } as Garment;

  return (
    <form className="card" action={(fd) => {
      const garment: Garment = {
        ...current,
        name: String(fd.get('name') || ''), image: String(fd.get('image') || PLACEHOLDER_IMAGE), category: String(fd.get('category') || 'tops'),
        subcategory: String(fd.get('subcategory') || ''), colorPrimary: String(fd.get('colorPrimary') || ''), colorSecondary: String(fd.get('colorSecondary') || '') || undefined,
        brand: String(fd.get('brand') || ''), size: String(fd.get('size') || ''), fit: String(fd.get('fit') || ''), fabric: String(fd.get('fabric') || '') || undefined,
        seasonality: String(fd.get('seasonality') || 'all-season') as Garment['seasonality'],
        formality: String(fd.get('formality') || 'casual') as Garment['formality'],
        tags: String(fd.get('tags') || '').split(',').map((x) => x.trim()).filter(Boolean),
        notes: String(fd.get('notes') || '') || undefined,
        price: Number(fd.get('price') || 0) || undefined,
        purchaseDate: String(fd.get('purchaseDate') || '') || undefined,
        updatedAt: new Date().toISOString()
      };
      onSave(garment);
    }}>
      <h3>{initial ? 'Edit garment' : 'Add garment'}</h3>
      <div className="grid cols-3">
        <label>Name<input className="input" name="name" defaultValue={current.name} required /></label>
        <label>Image URL<input className="input" name="image" defaultValue={current.image} /></label>
        <label>Category<select name="category" defaultValue={current.category}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>Subcategory<input className="input" name="subcategory" defaultValue={current.subcategory} /></label>
        <label>Primary color<input className="input" name="colorPrimary" defaultValue={current.colorPrimary} /></label>
        <label>Secondary color<input className="input" name="colorSecondary" defaultValue={current.colorSecondary} /></label>
        <label>Brand<input className="input" name="brand" defaultValue={current.brand} /></label>
        <label>Size<input className="input" name="size" defaultValue={current.size} /></label>
        <label>Fit<input className="input" name="fit" defaultValue={current.fit} /></label>
        <label>Fabric<input className="input" name="fabric" defaultValue={current.fabric} /></label>
        <label>Season<select name="seasonality" defaultValue={current.seasonality}>{SEASONS.map((s) => <option key={s}>{s}</option>)}</select></label>
        <label>Formality<select name="formality" defaultValue={current.formality}>{FORMALITIES.map((f) => <option key={f}>{f}</option>)}</select></label>
        <label>Tags<input className="input" name="tags" defaultValue={current.tags.join(', ')} /></label>
        <label>Price<input className="input" type="number" name="price" defaultValue={current.price} /></label>
        <label>Purchase date<input className="input" type="date" name="purchaseDate" defaultValue={current.purchaseDate} /></label>
      </div>
      <label>Notes<textarea name="notes" defaultValue={current.notes} /></label>
      <div className="row"><button className="btn primary" type="submit">Save garment</button><button type="button" className="btn" onClick={onCancel}>Cancel</button></div>
    </form>
  );
}
