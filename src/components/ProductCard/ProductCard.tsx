import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { useCart } from '../../context/CartContext';
import cn from 'classnames';
interface Props {
  product: Product;
  showDiscount?: boolean;
}
export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = true,
}) => {
  const { addToCart, addToFavorites, isInCart, isInFavorites } = useCart();
  const { itemId, image, name, price, fullPrice, screen, capacity, ram } =
    product;
  const isFavorite = isInFavorites(product.id);
  const isAddedToCart = isInCart(product.id);

  return (
    <article className={styles.card}>
      <Link to={`/product/${itemId}`} className={styles.card__imageLink}>
        <img src={image} alt={name} className={styles.card__image} />
      </Link>
      <h3 className={styles.card__title}>
        <Link to={`/product/${itemId}`} className={styles.card__nameLink}>
          {name}
        </Link>
      </h3>
      <div className={styles.card__price}>
        <span className={styles.card__price_current}>${price}</span>
        {showDiscount && fullPrice > price && (
          <span className={styles.card__price_old}>${fullPrice}</span>
        )}
      </div>
      <div className={styles.card__divider}> </div>
      <div className={styles.card__specs}>
        <div className={styles.spec}>
          <span className={styles.spec__label}>Screen</span>
          <span className={styles.spec__value}>{screen}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.spec__label}>Capacity</span>
          <span className={styles.spec__value}>{capacity}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.spec__label}>RAM</span>
          <span className={styles.spec__value}>{ram}</span>
        </div>
      </div>
      <div className={styles.card__buttons}>
        <button
          type="button"
          className={cn(styles.button_add, {
            [styles['button_add--active']]: isAddedToCart, // Додається динамічно
          })}
          onClick={() => addToCart(product)}
        >
          {isAddedToCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={`${styles.button_favorite} ${isFavorite ? styles.button_favorite_active : ''}`}
          onClick={() => addToFavorites(product)}
        >
          <Icon name={isFavorite ? 'favoriteActive' : 'favourite'} />
          <div className={styles.heart_placeholder} />
        </button>
      </div>
    </article>
  );
};
