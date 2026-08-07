import { CartProduct } from '@src/features/cart/cart';

export const loadCart = (): CartProduct[] => {
  const saved = localStorage.getItem('cart');

  return saved ? JSON.parse(saved) : [];
};

export const savedCart = (items: CartProduct[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};
