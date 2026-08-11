import { Product } from '../types/product';
import { CartItem } from '../types/cartItem';

export const AddToCart = (product: Product) => {
  const stored = localStorage.getItem('cart');
  let cart: CartItem[] = stored ? JSON.parse(stored) : [];

  const existingItem = cart.find(item => item.product.id === product.id);

  if (existingItem) {
    cart = cart.filter(item => item.product.id !== product.id);
  } else {
    cart.push({ product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));
  const inCart = cart.some(item => item.product.id === product.id);

  return { cart, inCart };
};
