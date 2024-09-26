import { Product } from '../../api/type/ProductCart'

export type CartContextType = {
  cartItems: { product: Product; quantity: number }[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
};
