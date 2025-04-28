import { useContext, useMemo } from 'react';
import { CartFavouritesContext } from '../../contexts/CartFavouritesContext';

export const useCartAndFavouritesCount = () => {
  const { state } = useContext(CartFavouritesContext);
  const { cart, favourites } = state;

  const cartCount = useMemo(() => {
    return cart.reduce((total, { quantity }) => total + quantity, 0);
  }, [cart]);

  const favouritesCount = useMemo(() => favourites.length, [favourites]);

  const renderCountBadge = (count: number) => {
    if (count === 0) {
      return null;
    }

    return count;
  };

  return {
    cartCount,
    favouritesCount,
    renderCountBadge,
  };
};
