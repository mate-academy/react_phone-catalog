import classNames from 'classnames';
import { Product } from '../../../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import HeartIcon from '../../../../assets/icons/heart.svg?react';
import HeartFilledIcon from '../../../../assets/icons/heart-filled.svg?react';
import styles from './ProductActions.module.scss';

interface Props {
  product: Product;
  size?: 'medium' | 'large';
  className?: string;
}

export const ProductActions = ({
  product,
  size = 'medium',
  className,
}: Props) => {
  const { isInCart, addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isAdded = isInCart(product.itemId);
  const isFavorited = isFavorite(product.itemId);

  return (
    <div
      className={classNames(styles.actions, className, {
        [styles.large]: size === 'large',
      })}
    >
      <button
        type="button"
        className={classNames(styles.addButton, {
          [styles.addButtonActive]: isAdded,
        })}
        onClick={() => addToCart(product)}
      >
        {isAdded ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        type="button"
        className={classNames(styles.favoriteButton, {
          [styles.favoriteButtonActive]: isFavorited,
        })}
        aria-label="Add to favourites"
        aria-pressed={isFavorited}
        onClick={() => toggleFavorite(product)}
      >
        {isFavorited ? <HeartFilledIcon /> : <HeartIcon />}
      </button>
    </div>
  );
};
