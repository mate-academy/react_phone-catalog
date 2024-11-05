import { useCallback, useEffect, useState } from 'react';
import { useAppContext } from '../ContextStor';
import { useLocalStorage } from '../LocaleStorage';

export const useCartAndFavorites = () => {
  const { cart, favorites } = useAppContext();
  const [quantities] = useLocalStorage<number[]>(
    'quantities',
    cart.length > 0 ? cart.map(() => 1) : [],
  );

  const [favoritesCount, setFavoritesCount] = useState(favorites.length);
  const [cartCount, setCartCount] = useState(0);

  // Функция для подсчета общего количества товаров
  const calculateTotalItems = useCallback(() => {
    return cart.reduce(
      (total, _, index) => total + (quantities[index] || 0),
      0,
    );
  }, [cart, quantities]);

  // Обновляем количество избранного
  useEffect(() => {
    setFavoritesCount(favorites.length);
  }, [favorites.length]);

  // Обновляем cartCount при изменении корзины или quantities
  useEffect(() => {
    setCartCount(calculateTotalItems());
  }, [cart, quantities, calculateTotalItems]);

  return { favoritesCount, cartCount };
};
