import { Garment, OutfitRecommendation } from '@/lib/andthe/types';

export function RecommendationCard({ rec, garments, onSaveDraft }: { rec: OutfitRecommendation; garments: Garment[]; onSaveDraft: (rec: OutfitRecommendation) => void }) {
  const picks = garments.filter((g) => rec.recommendedGarmentIds.includes(g.id));
  return (
    <article className="card">
      <h3>{rec.title}</h3>
      <small>{rec.occasion} · confidence {Math.round((rec.confidence ?? 0) * 100)}%</small>
      <p>{rec.rationale}</p>
      <div>{rec.aestheticTags.map((t) => <span key={t} className="badge">{t}</span>)}</div>
      <ul>{picks.map((g) => <li key={g.id}>{g.name}</li>)}</ul>
      <button className="btn" onClick={() => onSaveDraft(rec)}>Save as draft outfit</button>
    </article>
  );
}
