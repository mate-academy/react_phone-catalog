import { useSelector } from 'react-redux';
import { RootState } from '';

export const useCounts = () => {
  const favoriteCount = useSelector(
    (state: RootState) => state.favorites.items.length,
  );

  const cartCount = useSelector((state: RootState) => state.cart.items.length);

  return { favoriteCount, cartCount };
};
