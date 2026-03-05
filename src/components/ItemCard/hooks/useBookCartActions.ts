import { useCartFavorites } from '@/context/CartFavoritesContext';
import type { Book } from '@/types/Book';

export const useBookCartActions = (book: Book) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    toggleFavorite,
    isFavorite,
  } = useCartFavorites();

  const isBookFavorite = isFavorite(book.id);
  const cartItem = cart.find((item) => item.id === book.id);
  const quantity = cartItem?.quantity ?? 0;
  const isInCart = quantity > 0;

  const handleToggleCart = () => {
    if (isInCart) {
      removeFromCart(book.id);
    } else {
      addToCart(book);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity === 0) {
      addToCart(book);
    } else {
      increaseQuantity(book.id);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      decreaseQuantity(book.id);
    } else if (quantity === 1) {
      removeFromCart(book.id);
    }
  };

  const handleToggleFavorite = () => toggleFavorite(book);

  return {
    quantity,
    isInCart,
    isBookFavorite,
    handleToggleCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleToggleFavorite,
  };
};
