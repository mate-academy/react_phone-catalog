import { Category } from './Category';
import { Product } from './Product';

export interface Description {
  title: string;
  text: string[];
}

export interface ProductDetails {
  id: string;
  category: Category;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
}

export interface ProductWithVariants {
  details: ProductDetails;
  /** The id products.json uses — cards and favourites are keyed by it. */
  itemId: string;
  /** The products.json entry for the same model, which a cart line is built from. */
  card: Product | null;
  /** The same model in every available color and capacity. */
  variants: ProductDetails[];
}
