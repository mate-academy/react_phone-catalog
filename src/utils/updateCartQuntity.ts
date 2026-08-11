import { CartItem } from '../types/cartItem';

export const updateCartQuantity = (productId: number, delta: number) => {
  const stored = localStorage.getItem('cart');
  let cart: CartItem[] = stored ? JSON.parse(stored) : [];

  const existingItem = cart.find(item => item.product.id === productId);

  if (existingItem) {
    existingItem.quantity += delta;

    if (existingItem.quantity <= 0) {
      cart = cart.filter(cartItem => cartItem.product.id !== productId);
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));

  return { cart };
};
