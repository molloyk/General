# anDThe v1 Foundation

## What was built
A modular **anDThe** feature inside this repository with local-first data and clear service boundaries for future backend + AI integration.

## Route map
- `/andthe`: landing + stats
- `/andthe/wardrobe`: garment catalog + add/edit/delete + search/filter
- `/andthe/outfits`: outfit library + link garments + add/edit/delete
- `/andthe/generate`: outfit recommendation flow
- `/andthe/shop`: shopping assistant flow
- `/andthe/profile`: style preference profile editor
- `/api/andthe/ai`: provider-agnostic AI text generation endpoint

## Folder structure
- `app/andthe/*`: route pages
- `components/andthe/*`: feature UI and forms
- `lib/andthe/types.ts`: domain models
- `lib/andthe/mock-data.ts`: seeded garments/outfits/profile/brands
- `lib/andthe/storage.ts`: local storage abstraction
- `lib/andthe/recommendation-engine.ts`: outfit recommendation ranking + rationale composition
- `lib/andthe/shopping-recommendation-engine.ts`: brand recommendation ranking
- `lib/andthe/api/*`: provider abstraction and Gemini/mock providers
- `lib/andthe/ai-client.ts`: front-end API client to AI route

## Data model highlights
Core entities are strongly typed: `UserStyleProfile`, `Garment`, `Outfit`, `ShoppingIntent`, `OutfitRecommendation`, `BrandRecommendation`, and `BrandProfile`.

## Recommendation logic today
### Outfit engine
- Uses anchor garment + wardrobe inventory
- Scores category balance + formality alignment + color variation + profile color preference
- Pulls co-occurrence inspiration from saved outfits
- Produces recommendation payload with rationale + aesthetic tags

### Shopping engine
- Scores mock brands using style tag overlap, category strength, budget matching, favorite/avoid brand preferences
- Returns ranked brand suggestions with search terms and rationale

## AI integration shape
- Client layers call `/api/andthe/ai` through `lib/andthe/ai-client.ts`.
- API route uses provider abstraction (`AIProvider`) to support mock and Gemini implementations.
- Gemini provider reads `GEMINI_API_KEY`, `GEMINI_MODEL`, and `GEMINI_API_URL` env vars.
- Default mode remains mock for local-first behavior.

## Mocked vs production-ready
### Mocked
- AI defaults to mock provider unless explicitly switched.
- No external ecommerce product retrieval.
- Browser storage only (localStorage), no backend persistence.

### Production-ready foundation aspects
- Domain modeling and separation of concern across pages/components/services.
- Modular recommendation engines and replaceable storage interfaces.
- Route-level UX flows that can connect to server APIs later.
- API-call architecture now provider-agnostic and ready for real model wiring.

## Recommended next iteration
1. Add API routes and database persistence for wardrobe/outfit/profile entities.
2. Move recommendation generation orchestration to server-side API handlers.
3. Add image upload storage pipeline and thumbnail processing.
4. Add auth and per-user data isolation.
5. Expand recommendation ranking with feedback loops and telemetry.
