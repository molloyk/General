'use client';

import { useMemo, useState } from 'react';
import { EmptyState } from './EmptyState';
import { GarmentCard } from './GarmentCard';
import { GarmentForm } from './GarmentForm';
import { SectionHeader } from './SectionHeader';
import { filterGarments } from '@/lib/andthe/garment-utils';
import { useAndTheState } from '@/lib/andthe/use-andthe-state';
import { Garment } from '@/lib/andthe/types';

export function WardrobeCatalogClient() {
  const { garments, saveGarment, deleteGarment, isHydrated } = useAndTheState();
  const [editing, setEditing] = useState<Garment | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const filtered = useMemo(() => filterGarments(garments, { query, category, color: '', brand: '', seasonality: '', formality: '' }), [garments, query, category]);
  if (!isHydrated) return <p>Loading wardrobe…</p>;

  return (
    <div className="grid">
      <SectionHeader title="Wardrobe Catalog" description="Track every individual garment with metadata for filtering and recommendations." action={<button className="btn primary" onClick={() => { setShowForm(true); setEditing(undefined); }}>Add garment</button>} />
      {showForm ? <GarmentForm initial={editing} onSave={(g) => { saveGarment(g); setShowForm(false); }} onCancel={() => setShowForm(false)} /> : null}
      <div className="card row">
        <label>Search<input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="name, brand, tags..." /></label>
        <label>Category<input className="input" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="tops, bottoms..." /></label>
      </div>
      {!filtered.length ? <EmptyState title="No garments found" message="Add your first piece or adjust filters." /> : (
        <div className="grid cols-3">
          {filtered.map((garment) => <GarmentCard key={garment.id} garment={garment} onEdit={(g) => { setEditing(g); setShowForm(true); }} onDelete={deleteGarment} />)}
        </div>
      )}
    </div>
  );
}
