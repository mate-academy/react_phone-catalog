import { FC } from 'react';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
// import classNames from 'classnames';
import styles from './CardButtons.module.scss';
import { Product } from '../../types/Product';
import { useCatalog } from '../../contexts/CatalogProvider';

type Props = {
  product?: Product | undefined;
};

export const CardButtons: FC<Props> = ({ product }) => {
  const { favoriteSelected, favoritesUrl } = useIconSrc();
  const { favorites, removeFromFavorites, addToFavorites } = useCatalog();

  const isFavorite = favorites.some(
    favProduct => favProduct.id === product?.id,
  );

  const handleFavoriteClick = () => {
    if (product) {
      if (isFavorite) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites(product);
      }
    }
  };

  return (
    <div className={styles.buttons}>
      <button className={styles.buttonCard}>
        <p className={styles.buttonText}>{false ? 'Remove' : 'Add to cart'}</p>
      </button>
      <button className={styles.buttonFavorite} onClick={handleFavoriteClick}>
        <img
          className={styles.buttonFavoriteIcon}
          src={isFavorite ? favoriteSelected : favoritesUrl}
          alt="favorite"
        />
      </button>
    </div>
  );
};
