'use client';

export function ImageUploader({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label>
      Image URL
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://..." />
    </label>
  );
}
