/**
 * Application-wide constants
 */

/**
 * Categories
 */
export const CATEGORIES = {
  PHONES: 'phones',
  TABLETS: 'tablets',
  ACCESSORIES: 'accessories',
} as const;

export const CATEGORY_LABELS = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
} as const;

/**
 * Sort Options
 */
export const SORT_OPTIONS = [
  { value: 'age', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
] as const;

/**
 * Pagination
 */
export const ITEMS_PER_PAGE_OPTIONS = [
  { value: 4, label: '4' },
  { value: 8, label: '8' },
  { value: 16, label: '16' },
  { value: 'all', label: 'All' },
] as const;

export const DEFAULT_ITEMS_PER_PAGE = 16;
export const DEFAULT_PAGE = 1;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  CART: 'cart',
  FAVORITES: 'favorites',
} as const;

/**
 * Routes
 */
export const ROUTES = {
  HOME: '/',
  PHONES: '/phones',
  TABLETS: '/tablets',
  ACCESSORIES: '/accessories',
  PRODUCT: '/product/:productId',
  CART: '/cart',
  FAVORITES: '/favorites',
} as const;

/**
 * Debounce delays (in milliseconds)
 */
export const DEBOUNCE_DELAY = {
  SEARCH: 500,
  RESIZE: 300,
} as const;

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 350,
} as const;

/**
 * Breakpoints (in pixels)
 */
export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1280,
  ULTRA: 1536,
} as const;

/**
 * Slider settings
 */
export const SLIDER_SETTINGS = {
  AUTO_PLAY_INTERVAL: 5000, // 5 seconds
  TRANSITION_DURATION: 300,
} as const;

/**
 * Product card limits
 */
export const PRODUCT_LIMITS = {
  HOT_PRICES: 12,
  BRAND_NEW: 12,
  SUGGESTED: 12,
} as const;
