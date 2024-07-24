import { useMemo } from 'react';
import { useFavouriteProducts } from '../../store/FavouriteProductsContext';
import { FavouritesIcon } from '../Icons/FavouritesIcon';
import { FavouritesSelectedIcon } from '../Icons/FavouritesSelectedIcon';

import styles from './FavouritesButton.module.scss';

type Props = {
  productId: number;
};

export const FavouritesButton: React.FC<Props> = ({ productId }) => {
  const { favouriteProducts } = useFavouriteProducts();

  const isLiked = useMemo(() => {
    return favouriteProducts.find(
      favouriteProduct => favouriteProduct.id === productId,
    );
  }, [favouriteProducts, productId]);

  return (
    <div className={styles.favouriteButton}>
      {isLiked ? <FavouritesSelectedIcon /> : <FavouritesIcon />}
    </div>
  );
};
