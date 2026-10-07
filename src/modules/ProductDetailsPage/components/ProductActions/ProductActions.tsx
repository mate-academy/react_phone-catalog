import styles from './ProductActions.module.scss';
import classNames from 'classnames';
import { Product } from '../../../../types/Product';
import { useCart } from '../../../../context/CartContext';
import { useFavorites } from '../../../../context/FavoritesContext';

type ProductActionsProps = {
  product: Product;
};

export const ProductActions = ({ product }: ProductActionsProps) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const isInCart = cart.some(item => item.id === product.id);

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(product.id);

      return;
    }

    addToCart(product);
  };

  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.includes(product.id);

  return (
    <section className={styles.product_actions}>
      <div className={styles.product_actions__price_container}>
        {product.price < product.fullPrice ? (
          <>
            <p className={styles.product_actions__price_container__price}>
              ${product.price}
            </p>
            <p className={styles.product_actions__price_container__full_price}>
              ${product.fullPrice}
            </p>
          </>
        ) : (
          <p className={styles.product_actions__price_container__price}>
            ${product.price}
          </p>
        )}
      </div>

      <div className={styles.product_actions__actions}>
        <button
          type="button"
          className={classNames(styles.product_actions__btnCart, {
            [styles['product_actions__btnCart--added']]: isInCart,
          })}
          onClick={handleCartClick}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={classNames(styles.product_actions__btnFavorite, {
            [styles['product_actions__btnFavorite--active']]: isFavorite,
          })}
          onClick={() => toggleFavorite(product.id)}
        >
          <img
            src={
              isFavorite ? '/img/icons/like-active.svg' : '/img/icons/like.svg'
            }
            alt="Like"
          />
        </button>
      </div>
    </section>
  );
};
