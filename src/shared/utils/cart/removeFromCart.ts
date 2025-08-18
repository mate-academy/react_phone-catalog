import { CartItem } from '../../context/ProductsContext';
import { Product } from '../../types/Product';

export const removeFromCart = (
  item: Product,
  cartItems: CartItem[],
  setCartItems: (items: CartItem[]) => void,
) => {
  setCartItems(cartItems.filter(cart => cart.id !== item.id));
};
