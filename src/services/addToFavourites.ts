// eslint-disable-next-line max-len
import { AppDispatch } from '../app/store';
import { deleteFavourites, setFavourites } from '../app/reducers/favourites';
import { Props } from '../../src/modules/shared/ProductCard/ProductCard';

export const handleAddToFavourites = (
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
  favouritesProducts: Props[],
  dispatch: AppDispatch,
  color: string = '',
  year: number = 0,
  quantity: number = 0,
) => {
  const productExists = favouritesProducts.some(
    product =>
      product.id === id ||
      product.itemId === id ||
      product.id === itemId ||
      product.itemId == itemId,
  );

  if (!productExists) {
    dispatch(
      setFavourites([
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
          color,
          year,
          quantity,
        },
      ]),
    );
  } else {
    dispatch(deleteFavourites(itemId ? itemId : String(id)));
  }
};
