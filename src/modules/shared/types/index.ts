export interface Product {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable?: string[];
  capacity?: string;
  priceRegular: number;
  priceDiscount?: number;
  colorsAvailable?: string[];
  color?: string;
  images: string[];
  description?: {
    title: string;
    text: string[];
  }[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  year?: number;
  fullPrice?: number;
  discountPrice?: number;
  brand?: string;
  stock?: number;
  itemId?: string;
  slug?: string;
  image?: string;
  screenSize?: string;
  cpu?: string;
  storage?: string;
  discount?: number;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface FavoritContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
