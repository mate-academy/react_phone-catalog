import { CartItem } from '../../context/ProductsContext';
import { Product } from '../../types/Product';

export const addToCart = (
  item: Product,
  cartItems: CartItem[],
  setCartItems: (items: CartItem[]) => void,
) => {
  const existingItem = cartItems.find(cart => cart.id === item.id);

  if (existingItem) {
    setCartItems(
      cartItems.map(cart =>
        cart.id === item.id ? { ...cart, quantity: cart.quantity + 1 } : cart,
      ),
    );
  } else {
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  }
};
