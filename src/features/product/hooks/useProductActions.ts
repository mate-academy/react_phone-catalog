import { useAppDispatch } from '@/store/hooks';
import { addToCart, selectIsInCart } from '@/store/slices/cartSlice';
import {
  addToFavorites,
  removeFromFavorites,
  selectIsFavorite,
} from '@/store/slices/favoritesSlice';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export const useProductActions = (itemId?: string) => {
  const dispatch = useAppDispatch();

  const inCart = useSelector(selectIsInCart(itemId || ''));
  const inFav = useSelector(selectIsFavorite(itemId || ''));

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (itemId) {
      dispatch(addToCart(itemId));
    }
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!itemId) {
      return;
    }

    if (inFav) {
      dispatch(removeFromFavorites(itemId));
    } else {
      dispatch(addToFavorites(itemId));
      toast.success('Added to favorites');
    }
  };

  return {
    inCart,
    inFav,
    handleCartClick,
    handleFav,
    buttonText: inCart ? 'Added to Cart' : 'Add to Cart',
  };
};
