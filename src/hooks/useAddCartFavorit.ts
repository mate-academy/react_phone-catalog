import { addBacketId } from '../features/basketSlice';
import { addFavoritId, deleteFavoritId } from '../features/favoritSlice';
import { useAppDispatch, useAppSelector } from './hookStore';

export const useAddCartFavorit = (productId?: string) => {
  const dispatch = useAppDispatch();
  const { backetsId } = useAppSelector(state => state.backets);
  const { favoritId } = useAppSelector(state => state.favorit);
  const { products } = useAppSelector(state => state.products);

  const product = products.find(item => item.itemId === productId);

  const handleToBasket = () => {
    if (!product) {
      return;
    }

    if (!backetsId.map(item => item.itemId).includes(product.itemId)) {
      dispatch(
        addBacketId({
          itemId: product.itemId,
          count: 1,
          product: product,
        }),
      );
    }
  };

  const handleToFavorit = () => {
    if (!product) {
      return;
    }

    if (favoritId.includes(product.itemId)) {
      dispatch(deleteFavoritId(product.itemId));
    } else {
      dispatch(addFavoritId(product.itemId));
    }
  };

  const includesBacket = () => {
    if (!product) {
      return;
    }

    return backetsId.map(item => item.itemId).includes(product.itemId);
  };

  const includesFavorit = () => {
    if (!product) {
      return false;
    }

    return favoritId.includes(product.itemId);
  };

  return {
    handleToBasket,
    handleToFavorit,
    includesBacket,
    includesFavorit,
  };
};
