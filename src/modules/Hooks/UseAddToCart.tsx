import { useState } from 'react';
import { Phone } from '../../Types/type';

export const useAddToCart = () => {
  const [itemsInCart, setItemsInCart] = useState<Phone[]>([]);

  const toggleInCart = (product: Phone) => {
    setItemsInCart(prev => {
      const exists = prev.some(item => item.id === product.id);

      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  return { itemsInCart, toggleInCart };
};

export default useAddToCart;
