import { useMemo } from 'react';
import { useFavouriteProducts } from '../../store/FavouriteProductsContext';
import { FavouritesIcon } from '../Icons/FavouritesIcon';
import { FavouritesSelectedIcon } from '../Icons/FavouritesSelectedIcon';

import styles from './FavouritesButton.module.scss';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
};

export const FavouritesButton: React.FC<Props> = ({ product }) => {
  const { favouriteProducts, handleFavourites } = useFavouriteProducts();

  const { id } = product;

  const isLiked = useMemo(() => {
    return favouriteProducts.find(
      favouriteProduct => favouriteProduct.id === id,
    );
  }, [favouriteProducts, id]);

  return (
    <div
      onClick={() => handleFavourites(product)}
      className={styles.favouriteButton}
    >
      {isLiked ? <FavouritesSelectedIcon /> : <FavouritesIcon />}
    </div>
  );
};
