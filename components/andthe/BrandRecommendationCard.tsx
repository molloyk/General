import { BrandRecommendation } from '@/lib/andthe/types';

export function BrandRecommendationCard({ recommendation }: { recommendation: BrandRecommendation }) {
  return (
    <article className="card">
      <h3>{recommendation.brandName}</h3>
      <small>{recommendation.priceTier}</small>
      <p>{recommendation.rationale}</p>
      <div>{recommendation.categoryStrength.map((c) => <span key={c} className="badge">{c}</span>)}</div>
      {recommendation.suggestedSearchTerms?.length ? <small>Search ideas: {recommendation.suggestedSearchTerms.join(' · ')}</small> : null}
    </article>
  );
}
