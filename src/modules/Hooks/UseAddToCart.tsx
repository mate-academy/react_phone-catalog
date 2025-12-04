import { useState } from "react";
import { Phone } from "../../Types/type";

export const useAddToCart = () => {
  const [favourites, setFavourites] = useState<Set<string>>(new Set());
  const [itemsInCart, setItemsInCart] = useState<Phone[]>([]);
const toggleFavourite = (product: Phone) => {
  setItemsInCart(prev => {
    const exists = prev.some(item => item.id === product.id);
    
    if (exists) {
      return prev.filter(item => item.id !== product.id);
    } else {
      return [...prev, product];
    }
  });
  
};

  return { favourites, itemsInCart, toggleFavourite };
};

export default useAddToCart; 