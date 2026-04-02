// =============================================================================
// types/index.ts — Shared TypeScript interfaces
// Derived from: public/api/products.json, phones.json, tablets.json, accessories.json
// Do NOT duplicate these in component files — import from here.
// =============================================================================

// =============================================================================
// SHARED
// =============================================================================

export type Category = 'phones' | 'tablets' | 'accessories';

// =============================================================================
// PRODUCT — from public/api/products.json
// Used for: ProductCard, CatalogPage grid, ProductSlider (NewModels / HotPrices)
// =============================================================================

export interface Product {
  id: number;
  category: Category;
  itemId: string;     // URL slug — matches id field in detail JSON files
  name: string;
  fullPrice: number;  // original price (crossed out)
  price: number;      // sale price (displayed)
  screen: string;     // e.g. "6.1' IPS"
  capacity: string;   // e.g. "128GB"  (accessories: physical size e.g. "38mm")
  color: string;
  ram: string;
  year: number;
  image: string;      // root-relative path: "img/phones/.../00.webp"
}

// =============================================================================
// PRODUCT DETAILS — from public/api/phones.json / tablets.json / accessories.json
// Used for: ProductDetailsPage
// =============================================================================

export interface DescriptionSection {
  title: string;
  text: string[];
}

export interface ProductDetails {
  id: string;                    // variant slug: "apple-iphone-11-128gb-black"
  category: Category;
  namespaceId: string;           // product family: "apple-iphone-11"
  name: string;
  capacityAvailable: string[];   // all variants: ["64GB","128GB","256GB"]
  capacity: string;              // this variant's capacity/size
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];     // all color variants: ["black","green","white"]
  color: string;
  images: string[];              // 5 images for phones, 3 for tablets/accessories
  description: DescriptionSection[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;               // phones & tablets
  zoom?: string;                 // phones & tablets
  cell: string[];                // network standards or ["Not applicable"]
}

// =============================================================================
// CART
// =============================================================================

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

// =============================================================================
// FAVOURITES
// =============================================================================

export interface FavouritesState {
  items: Product[];
}

// =============================================================================
// CATALOG PAGE
// =============================================================================

export type SortOption = 'newest' | 'alphabetically' | 'cheapest';
export type PerPageOption = '4' | '8' | '16' | 'all';

export interface CatalogFilters {
  sort: SortOption;
  perPage: PerPageOption;
  page: number;
}
