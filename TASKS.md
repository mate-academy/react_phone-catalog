**Prioritized tasks to improve project (beginner → advanced)**

Beginner (quick wins, high impact)

- [ ] Extract SVG icons from `Menu.tsx` into `public/img` or `src/components/ui/icons/` (reduce bundle size). (small, 1-2h)
- [ ] Centralize static strings into `src/i18n/copy.ts` (start with a few labels: `Checkout`, `Cart empty`, modal text). (small, 30–60m)
- [ ] Add a typed `RoutePaths` enum and replace literal route strings. (small, 1h)
- [ ] Add basic a11y to modal: trap focus, ESC to close, aria attributes. (small, 1–2h)

Intermediate (refactor, improves architecture)

- [ ] Consolidate state ownership: pick Redux as single source of truth. Convert `CartContext` to a read-only adapter or remove duplicated initialization. (medium, 4–8h)
- [ ] Move API calls into hooks/services: create `src/services/products.ts` and `useProducts`, `useProduct` hooks; replace inline `getProducts()` calls. (medium, 4–8h)
- [ ] Extract large components: split `ProductPage` into `ProductPage.container.tsx` (data + effects) and `ProductPage.view.tsx` (presentational). (medium, 3–6h)
- [ ] Replace ad-hoc `variant?: string` props with a discriminated union / enum for `PageHeader` variants. (small, 1–2h)

Advanced (quality, tests, architecture)

- [ ] Add unit tests and a CI workflow: jest + React Testing Library for `AppRouter`, `ProductPage.view`, and `Cart` behaviors. (large, 1–2 days)
- [ ] Implement a caching layer for API responses (SW or in-memory cache) and use it via the `useProducts` hook. (large, 1–2 days)
- [ ] Replace localStorage persistence with a single, testable persist strategy in Redux middleware; remove context/localStorage duplication. (large, 1 day)
- [ ] Create an accessibility pass and automated a11y checks (axe, or Playwright accessibility scans). (large, 1 day)

Suggested first PR (small, high-value)

- 1. Extract icons + centralize two modal strings + add `RoutePaths` enum.
- 2. Add `useProducts` and swap one consumer (`Cart` or `ProductPage`) to use it. This demonstrates architectural improvement without rewriting everything.

Notes

- Each task lists a rough estimate — adjust after reviewing code. I can implement any item and open PRs incrementally; tell me which to start.
