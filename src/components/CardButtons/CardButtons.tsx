import { FC } from 'react';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
// import classNames from 'classnames';
import styles from './CardButtons.module.scss';
import { Product } from '../../types/Product';
import { useCatalog } from '../../contexts/CatalogProvider';
import classNames from 'classnames';

type Props = {
  product?: Product | undefined;
};

export const CardButtons: FC<Props> = ({ product }) => {
  const { favoriteSelected, favoritesUrl } = useIconSrc();
  const {
    favorites,
    carts,
    removeFromFavorites,
    addToFavorites,
    addToCart,
    removeFromCart,
  } = useCatalog();

  const isFavorite = favorites.some(
    favProduct => favProduct.id === product?.id,
  );

  const isCart = carts.some(cart => cart.id === product?.id);

  const handleFavoriteClick = () => {
    if (product) {
      if (isFavorite) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites(product);
      }
    }
  };

  const handleCartClick = () => {
    if (product) {
      if (isCart) {
        removeFromCart(product.id);
      } else {
        addToCart(product);
      }
    }
  };

  return (
    <div className={styles.buttons}>
      <button
        className={classNames(styles.buttonCard, {
          [styles.buttonActive]: isCart,
        })}
        onClick={handleCartClick}
      >
        <p className={styles.buttonText}>{isCart ? 'Added' : 'Add to cart'}</p>
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
