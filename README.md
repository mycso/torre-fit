# Torre Fit

Small skill-to-job fit explorer using Torre public APIs.

## What it does
1. Load a Torre profile via username (`/api/genome/bios/:username`)
2. Extract a normalized skill list from `strengths`
3. Search open opportunities via Torre search endpoint
4. Derive opportunity “terms” from available fields and compute a simple overlap score
5. Display match score, matched terms, and aggregated gap suggestions

## Tech
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Vitest (unit tests for fit logic)
- Server route handlers as API proxies to avoid CORS and keep API usage centralized

## Architecture
- `src/app/api/...` — server route handlers proxying Torre endpoints
- `src/lib/torre/*` — typed client and minimal DTO types
- `src/lib/fit/*` — pure utilities (normalize/extract/score) with tests
- `src/components/*` — UI components

## Assumptions
- Torre genome `strengths` is the best available signal for “skills”.
- Torre opportunity search results don’t always include structured skills, so the app derives terms pragmatically from objective/org/location fields.

## Trade-offs
- Fit scoring is intentionally lightweight (token overlap) to keep it explainable and testable in a short take-home.
- Because opportunity data can be sparse, derived terms are an approximation.

## Next steps (if more time)
- Enrich opportunity cards by fetching `/api/suite/opportunities/:id` on demand for better skill extraction.
- Add caching strategy (revalidate) for genome reads.
- Add a small “fit distribution” visualization.

## Running locally
```bash
npm i
npm run dev