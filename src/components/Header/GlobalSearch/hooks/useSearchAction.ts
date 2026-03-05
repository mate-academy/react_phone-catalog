import { useNavigate } from 'react-router-dom';
import { useCartFavorites } from '@/context/CartFavoritesContext';
import { showSuccess } from '@/lib/toast';
import type { Book } from '@/types/Book';

export const useSearchActions = (
  onClose: () => void,
  onSelect?: () => void,
) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, isInCart, addToCart } =
    useCartFavorites();

  const handleBookChange = (book: Book) => {
    navigate(`/item/${book.type}/${book.slug}`);
    onClose();
    onSelect?.();
  };

  const handleAddToCart = (book: Book, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    addToCart(book);
    showSuccess('Book added to cart!');
  };

  const handleToggleFavorite = (book: Book, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!isFavorite(book.id)) {
      toggleFavorite(book);
      showSuccess('Book added to favorites!');
    }
  };

  const handleViewAll = () => {
    onClose();
    onSelect?.();
    navigate('/');
  };

  return {
    handleBookChange,
    handleAddToCart,
    handleToggleFavorite,
    handleViewAll,
    isFavorite: (id: string | number) => isFavorite(String(id)),
    isInCart: (id: string | number) => isInCart(String(id)),
  };
};
