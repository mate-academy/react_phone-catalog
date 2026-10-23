# Architecture

## Application entry point

The application is initialized in `src/main.tsx`.

- `HashRouter` from React Router provides client-side routing using URL hashes.
- `CartProvider` and `FavoritesProvider` wrap the application so their state can be accessed by descendant components.
- `globals.scss` is imported at the entry point for global styles.

The `ThemeProvider` import and wrapper are currently commented out, so theme context is not active in the shown setup.

## Application component

`src/App.tsx` defines the main page layout:

- `Header` appears above the page content.
- `Routes` renders the page matching the current route.
- `Footer` appears below the page content.

### Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/phones` | Phones |
| `/tablets` | Tablets |
| `/accessories` | Accessories |
| `/product/:productId` | Product details |
| `/cart` | Shopping cart |
| `/favorites` | Favorites |
| `*` | Not found |

## Source folders

Based on the provided project structure:

- `src/api/` — API and data-access code
- `src/components/` — reusable UI components
- `src/contexts/` — shared application state
- `src/hooks/` — reusable hooks
- `src/modules/` — page-level modules
- `src/styles/` — global styles
- `src/types/` — TypeScript types
- `src/utils/` — helper functions

This overview will be updated as the remaining files are reviewed.
