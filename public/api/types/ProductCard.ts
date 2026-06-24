export interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export type PriceMode = 'full' | 'both';

export interface ProductCardProps {
  product: Product;
  priceMode?: PriceMode;
  onAddToCart?: (p: Product) => void;
  onLike?: (p: Product) => void;
}
