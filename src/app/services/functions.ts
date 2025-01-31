// app/services/favoriteUtils.ts
import { AppDispatch } from '../store';
import { deleteFavorites, setFavorites } from '../../features/favorite';
import { ProductCardProps } from '../../components/products/productCard';

export const handleAddToFavorites = (
  id: number | string,
  itemId: string,
  image: string,
  name: string,
  price: number,
  fullPrice: number,
  screen: string,
  capacity: string,
  ram: string,
  category: string,
  favoritesProducts: ProductCardProps[],
  dispatch: AppDispatch,
) => {
  const productExists = favoritesProducts.some(
    product =>
      product.id === id ||
      product.itemId === id ||
      product.id === itemId ||
      product.itemId == itemId,
  );

  if (!productExists) {
    dispatch(
      setFavorites([
        {
          id,
          image,
          name,
          price,
          fullPrice,
          screen,
          capacity,
          ram,
          itemId,
          category,
        },
      ]),
    );
  } else {
    dispatch(deleteFavorites(itemId ? itemId : id));
  }
};
