import { Outfit } from '@/lib/andthe/types';

export function OutfitCard({ outfit, onEdit, onDelete }: { outfit: Outfit; onEdit: (outfit: Outfit) => void; onDelete: (id: string) => void }) {
  return (
    <article className="card">
      <img className="preview" src={outfit.image} alt={outfit.name} />
      <h3>{outfit.name}</h3>
      <small>{outfit.formality} · {outfit.seasonality}</small>
      <div>{outfit.occasionTags.map((tag) => <span className="badge" key={tag}>{tag}</span>)}</div>
      <small>Linked garments: {outfit.garmentIds.length}</small>
      <div className="row">
        <button className="btn" onClick={() => onEdit(outfit)}>Edit</button>
        <button className="btn" onClick={() => onDelete(outfit.id)}>Delete</button>
      </div>
    </article>
  );
}
