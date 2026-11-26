import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

export const useIconLinks = () => {
  const { cartItems } = useCart();
  const { favorites } = useFavorites();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return [
    {
      to: '/favorites',
      icon: 'images/icons/favorites-default.png',
      label: 'Favorites',
      count: favorites.length,
    },
    {
      to: '/cart',
      icon: 'images/icons/cart-default.png',
      label: 'Cart',
      count: cartCount,
    },
  ];
};
