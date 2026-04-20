# anDThe v2 Structure Review (Next.js + Vercel Ready)

## Current status
The app is correctly based on **Next.js App Router** with route-level segmentation, local-first state, and a provider-agnostic AI endpoint. This is a solid starter architecture for Vercel deployment.

## Updated route map
- `/andthe`: dashboard + quick links
- `/andthe/capture`: camera/upload intake for single pieces + full outfits
- `/andthe/wardrobe`: closet section (individual garments)
- `/andthe/outfits`: wardrobe section (full outfit combinations)
- `/andthe/generate`: LLM-assisted outfit recommendations (with location/weather context input)
- `/andthe/shop`: personalized product-brand search direction
- `/andthe/profile`: profile + preferences (brand, fit, style, color, materials, origin)
- `/api/andthe/ai`: provider abstraction for LLM reasoning

## Structure assessment

### ✅ What is now aligned to your product scope
1. **Capture-first flow exists**
   - The app now has a dedicated intake route supporting image upload/camera capture (`capture="environment"`).
   - Full outfit capture explicitly asks for piece-level rows so each item is saved to the closet and the grouped outfit is saved to the wardrobe.
2. **Closet vs Wardrobe separation is explicit**
   - Closet = individual garments (`/andthe/wardrobe`)
   - Wardrobe = saved combinations (`/andthe/outfits`)
3. **Search personalization now models your preference depth**
   - Profile includes preferred fits/silhouettes/materials/brand origins and American-made prioritization.
   - Shopping ranking accounts for these preferences during recommendation scoring.
4. **Outfit generation includes weather/location hooks**
   - Generator accepts weather/location context today, and the logic already uses this signal for season-aware ranking.
5. **Vercel deployment posture is clean**
   - No custom server required.
   - Standard Next.js scripts and App Router structure are deployment-ready.

### ⚠️ Still mocked / next steps
1. **Image understanding is manual right now**
   - Intake asks users to enter piece data; no CV pipeline yet.
2. **No persistent backend yet**
   - Data still uses localStorage.
3. **No external product catalog API yet**
   - Shop suggestions are brand-guided, not product-SKU live results.
4. **Weather API is not yet wired server-side**
   - UI takes weather text now; can be replaced by automatic geolocation + forecast API later.

## Recommended production track (ordered)
1. Add auth + user-scoped DB (Supabase/Postgres/Prisma).
2. Move closet/wardrobe/profile CRUD to Route Handlers.
3. Add image upload storage (Vercel Blob/S3) and asynchronous image analysis jobs.
4. Add CV extraction for garment detection + piece segmentation from outfit photos.
5. Integrate real weather API + geocoding.
6. Integrate commerce APIs (Shopify affiliate, retailer feeds, or custom index).
7. Add event telemetry and user feedback loops to retrain ranking.

## Vercel setup checklist
1. Import repo into Vercel.
2. Set project framework preset to **Next.js**.
3. Configure environment variables from `.env.example`.
4. Set production branch + preview deployments.
5. Validate runtime logs for `/api/andthe/ai`.

## Summary
The app now has the right **section architecture** for your “anDThe” vision and is properly structured to continue into a production-grade Next.js + Vercel implementation.
