export type CategoryName = 'phones' | 'tablets' | 'accessories';

// Matches an entry from /api/products.json — the lightweight summary
// used everywhere except the details page (cards, cart, favorites,
// sliders, sorting/pagination).
export type Product = {
  id: string; // = itemId from products.json, also used as the route param
  numericId: number; // raw numeric id from products.json, shown as "ID: ..."
  category: CategoryName;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};
