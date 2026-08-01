import { Product } from './Product';

export interface CartItem {
  /** The products.json `itemId` — one cart line per product. */
  id: string;
  quantity: number;
  /**
   * Unlike favourites, a cart line keeps the whole product: the price has to
   * stay the one the user agreed to when adding it.
   */
  product: Product;
}
