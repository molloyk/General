'use client';

import { useState } from 'react';
import { EmptyState } from './EmptyState';
import { OutfitCard } from './OutfitCard';
import { OutfitForm } from './OutfitForm';
import { SectionHeader } from './SectionHeader';
import { useAndTheState } from '@/lib/andthe/use-andthe-state';
import { Outfit } from '@/lib/andthe/types';

export function OutfitLibraryClient() {
  const { outfits, garments, saveOutfit, deleteOutfit, isHydrated } = useAndTheState();
  const [editing, setEditing] = useState<Outfit | undefined>();
  const [showForm, setShowForm] = useState(false);
  if (!isHydrated) return <p>Loading outfits…</p>;

  return (
    <div className="grid">
      <SectionHeader title="Outfit Library" description="Save complete looks and link them back to garment records." action={<button className="btn primary" onClick={() => { setEditing(undefined); setShowForm(true); }}>Add outfit</button>} />
      {showForm ? <OutfitForm initial={editing} garments={garments} onSave={(o) => { saveOutfit(o); setShowForm(false); }} onCancel={() => setShowForm(false)} /> : null}
      {!outfits.length ? <EmptyState title="No outfits yet" message="Create complete looks to track what works and fuel recommendations." /> : (
        <div className="grid cols-3">
          {outfits.map((outfit) => <OutfitCard key={outfit.id} outfit={outfit} onEdit={(o) => { setEditing(o); setShowForm(true); }} onDelete={deleteOutfit} />)}
        </div>
      )}
    </div>
  );
}
