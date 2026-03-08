import { Garment } from '@/lib/andthe/types';

export function GarmentCard({ garment, onEdit, onDelete }: { garment: Garment; onEdit: (garment: Garment) => void; onDelete: (id: string) => void }) {
  return (
    <article className="card">
      <img className="preview" src={garment.image} alt={garment.name} />
      <h3>{garment.name}</h3>
      <small>{garment.brand} · {garment.category}/{garment.subcategory}</small>
      <p>{garment.colorPrimary} · {garment.formality} · {garment.seasonality}</p>
      <div>{garment.tags.map((t) => <span key={t} className="badge">{t}</span>)}</div>
      <div className="row">
        <button className="btn" onClick={() => onEdit(garment)}>Edit</button>
        <button className="btn" onClick={() => onDelete(garment.id)}>Delete</button>
      </div>
    </article>
  );
}
