import classNames from 'classnames';
import { Product } from '../../types/Product';
import { useStore } from '../../context/StoreContext';
import styles from './ProductActions.module.scss';

type Props = {
  product: Product;
  isLarge?: boolean;
};

export const ProductActions = ({ product, isLarge }: Props) => {
  const { cart, favorites, addToCart, toggleFavorite } = useStore();

  const inCart = cart.some(item => item.product.itemId === product.itemId);
  const isFavorite = favorites.some(item => item.itemId === product.itemId);

  return (
    <div
      className={classNames(styles.actions, {
        [styles['actions--large']]: isLarge,
      })}
    >
      <button
        className={classNames(styles.actions__cart, {
          [styles['actions__cart--added']]: inCart,
        })}
        onClick={() => addToCart(product)}
      >
        {inCart ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        className={classNames(styles.actions__favorite, {
          [styles['actions__favorite--active']]: isFavorite,
        })}
        onClick={() => toggleFavorite(product)}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <i className={isFavorite ? 'fas fa-heart' : 'far fa-heart'}></i>
      </button>
    </div>
  );
};
