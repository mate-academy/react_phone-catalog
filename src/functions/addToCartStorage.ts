import { CartType } from '../types/CartType';
import { Phone } from '../types/Phone';

export const addToCartStorage = (
  product: Phone | null,
  setIsAddedToCart: React.Dispatch<React.SetStateAction<boolean>>,
  setCartStorage: React.Dispatch<React.SetStateAction<CartType[]>>,
) => () => {
  const storage = JSON.parse(localStorage.getItem('cart') || '[]');

  storage.push({
    id: product?.id,
    quantity: 1,
    product,
  });

  setIsAddedToCart(true);

  localStorage.setItem('cart', JSON.stringify(storage));

  setCartStorage(storage);
};
