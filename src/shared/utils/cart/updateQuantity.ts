import { CartItem } from '../../context/ProductsContext';

export const updateQuantity = (
  id: string,
  quantity: number,
  cartItems: CartItem[],
  setCartItems: (items: CartItem[]) => void,
) => {
  setCartItems(
    cartItems.map(cart =>
      String(cart.id) === id ? { ...cart, quantity } : cart,
    ),
  );
};
