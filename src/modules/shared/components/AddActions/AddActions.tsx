import type React from 'react';
import classNames from 'classnames';
import { asset } from '../../../../helper';
import { useCart } from '../../../../context/CartContext';
import type { Product } from '../../../../types/Product';
import styles from './AddActions.module.scss';
import { useFavorites } from '../../../../context/FavoritesContext';

type Props = {
  product: Product;
  classname?: string;
};

export const AddActions: React.FC<Props> = ({ product, classname }) => {
  const { isInCart, addToCart } = useCart();
  const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites();
  const addedToCart = isInCart(product.id);
  const addedToFavorites = isInFavorites(product.id);

  return (
    <div className={classNames(styles.actions, classname)}>
      <button
        type="button"
        className={classNames(styles['add-button'], {
          [styles.added]: addedToCart,
        })}
        onClick={() => !addedToCart && addToCart(product)}
      >
        {addedToCart ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        type="button"
        className={styles['favorite-button']}
        onClick={() =>
          addedToFavorites
            ? removeFromFavorites(product.id)
            : addToFavorites(product)
        }
      >
        {addedToFavorites ? (
          <img src={asset('/img/favorites-red.svg')} alt="Added to favorites" />
        ) : (
          <img src={asset('/img/favorites.svg')} alt="Not added to favorites" />
        )}
      </button>
    </div>
  );
};
