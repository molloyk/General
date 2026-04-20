'use client';

import { useMemo, useState } from 'react';
import { Garment, Outfit } from '@/lib/andthe/types';
import { PLACEHOLDER_IMAGE } from '@/lib/andthe/constants';
import { useAndTheState } from '@/lib/andthe/use-andthe-state';
import { SectionHeader } from './SectionHeader';

type CaptureMode = 'garment' | 'outfit';

interface PieceDraft {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  colorPrimary: string;
  brand: string;
  size: string;
  fit: string;
}

const defaultPiece = (): PieceDraft => ({
  id: `piece-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  name: '',
  category: 'tops',
  subcategory: '',
  colorPrimary: '',
  brand: '',
  size: '',
  fit: ''
});

export function CaptureStudioClient() {
  const { saveGarment, saveOutfit, isHydrated } = useAndTheState();
  const [captureMode, setCaptureMode] = useState<CaptureMode>('garment');
  const [previewUrl, setPreviewUrl] = useState(PLACEHOLDER_IMAGE);
  const [pieces, setPieces] = useState<PieceDraft[]>([defaultPiece()]);

  const pieceCountLabel = useMemo(() => `${pieces.length} piece${pieces.length === 1 ? '' : 's'}`, [pieces.length]);

  if (!isHydrated) return <p>Loading capture studio…</p>;

  const onImageChange = (file: File | undefined) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const saveAsGarment = (piece: PieceDraft, formData: FormData) => {
    const garment: Garment = {
      id: `g-${Date.now()}-${piece.id}`,
      name: piece.name || String(formData.get('captureTitle') || 'Captured item'),
      image: previewUrl,
      category: piece.category,
      subcategory: piece.subcategory,
      colorPrimary: piece.colorPrimary,
      brand: piece.brand,
      size: piece.size,
      fit: piece.fit,
      seasonality: 'all-season',
      formality: 'casual',
      tags: ['captured'],
      notes: String(formData.get('captureNotes') || '') || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    saveGarment(garment);
    return garment;
  };

  const onSubmit = (formData: FormData) => {
    const garments = pieces.map((piece) => saveAsGarment(piece, formData));

    if (captureMode === 'outfit') {
      const outfit: Outfit = {
        id: `o-${Date.now()}`,
        name: String(formData.get('captureTitle') || 'Captured outfit'),
        image: previewUrl,
        garmentIds: garments.map((garment) => garment.id),
        occasionTags: String(formData.get('occasionTags') || 'captured').split(',').map((token) => token.trim()).filter(Boolean),
        seasonality: 'all-season',
        formality: 'smart-casual',
        notes: String(formData.get('captureNotes') || '') || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      saveOutfit(outfit);
    }

    setPieces([defaultPiece()]);
    setPreviewUrl(PLACEHOLDER_IMAGE);
  };

  return (
    <div className="grid">
      <SectionHeader
        title="Closet Capture"
        description="Use camera/upload intake to save single items or full outfits. Outfit captures always ask for individual piece details and write to both Closet + Wardrobe."
      />
      <form className="card grid" action={onSubmit}>
        <div className="row">
          <label>
            Capture mode
            <select value={captureMode} onChange={(event) => setCaptureMode(event.target.value as CaptureMode)}>
              <option value="garment">Single garment/accessory</option>
              <option value="outfit">Full outfit</option>
            </select>
          </label>
          <label>
            Photo / upload
            <input
              className="input"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(event) => onImageChange(event.target.files?.[0])}
              required
            />
          </label>
          <label>
            Capture title
            <input className="input" name="captureTitle" placeholder="Weekend denim fit" required />
          </label>
        </div>

        <img className="preview" src={previewUrl} alt="Captured preview" />

        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h4 style={{ margin: 0 }}>Piece details ({pieceCountLabel})</h4>
          <div className="row">
            <button type="button" className="btn" onClick={() => setPieces((prev) => [...prev, defaultPiece()])}>Add piece row</button>
            {pieces.length > 1 ? (
              <button type="button" className="btn" onClick={() => setPieces((prev) => prev.slice(0, -1))}>Remove last row</button>
            ) : null}
          </div>
        </div>

        <div className="grid cols-3">
          {pieces.map((piece, index) => (
            <div key={piece.id} className="card">
              <h5 style={{ marginTop: 0 }}>Piece {index + 1}</h5>
              <label>Name<input className="input" value={piece.name} onChange={(event) => setPieces((prev) => prev.map((entry) => entry.id === piece.id ? { ...entry, name: event.target.value } : entry))} required /></label>
              <label>Category<input className="input" value={piece.category} onChange={(event) => setPieces((prev) => prev.map((entry) => entry.id === piece.id ? { ...entry, category: event.target.value } : entry))} required /></label>
              <label>Subcategory<input className="input" value={piece.subcategory} onChange={(event) => setPieces((prev) => prev.map((entry) => entry.id === piece.id ? { ...entry, subcategory: event.target.value } : entry))} /></label>
              <label>Primary color<input className="input" value={piece.colorPrimary} onChange={(event) => setPieces((prev) => prev.map((entry) => entry.id === piece.id ? { ...entry, colorPrimary: event.target.value } : entry))} /></label>
              <label>Brand<input className="input" value={piece.brand} onChange={(event) => setPieces((prev) => prev.map((entry) => entry.id === piece.id ? { ...entry, brand: event.target.value } : entry))} /></label>
              <label>Size<input className="input" value={piece.size} onChange={(event) => setPieces((prev) => prev.map((entry) => entry.id === piece.id ? { ...entry, size: event.target.value } : entry))} /></label>
              <label>Fit<input className="input" value={piece.fit} onChange={(event) => setPieces((prev) => prev.map((entry) => entry.id === piece.id ? { ...entry, fit: event.target.value } : entry))} /></label>
            </div>
          ))}
        </div>

        {captureMode === 'outfit' ? (
          <label>
            Outfit occasion tags
            <input className="input" name="occasionTags" placeholder="streetwear, brunch, date night" />
          </label>
        ) : null}

        <label>
          Capture notes
          <textarea name="captureNotes" placeholder="Optional details that help recommendations later." />
        </label>

        <button className="btn primary" type="submit">Save capture</button>
      </form>
    </div>
  );
}
