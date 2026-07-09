import { useOutletContext } from 'react-router-dom';
import { ContextProps } from '../../../../types/ContextProps';
import { Product } from '../../../../types/Product';
import { ProductDetails } from '../../../../types/ProductDetails';

export const useActionButtons = (product: Product | ProductDetails) => {
  const { favorites, toggleFavorite, cart, addToCart, removeFromCart } =
    useOutletContext<ContextProps>();

  const targetId = 'itemId' in product ? product.itemId : product.id;

  const isFavorite = favorites.includes(targetId);
  const isInCart = cart.some(item => item.id === targetId);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(targetId);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      removeFromCart(targetId);
    } else {
      addToCart(targetId);
    }
  };

  return {
    isFavorite,
    isInCart,
    handleFavoriteClick,
    handleCartClick,
  };
};
