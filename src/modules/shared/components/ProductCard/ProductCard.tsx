import classNames from 'classnames';
import { useCart } from '../../../../context/CartContext';
import { Product } from '../../../../types/product';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { useFav } from '../../../../context/FavouritesContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, items } = useCart();
  const { favItems, addToFavourites, removeFromFavourites } = useFav();

  const isAlreadyInCart = items.find(item => item.id === product?.itemId);
  const isInFavourites = favItems.find(item => item.itemId === product?.itemId);

  const handleFavButton = () => {
    if (!product) {
      return;
    }

    if (isInFavourites) {
      removeFromFavourites(product.itemId);
    } else {
      addToFavourites(product);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__imageWrapper}>
        <Link to={`/product/${product.itemId}`} className={styles.card__link}>
          <img
            className={styles.card__img}
            src={`${product.image}`}
            alt={product.name}
          ></img>
        </Link>
      </div>

      <Link to={`/product/${product.itemId}`} className={styles.card__name}>
        {product.name}
      </Link>

      <div className={styles.card__cost}>
        <span className={styles.card__price}>{`$${product.price}`}</span>
        {product.fullPrice !== product.price && (
          <span
            className={styles.card__fullprice}
          >{`$${product.fullPrice}`}</span>
        )}
      </div>

      <div className={styles.card__divider}></div>

      <div className={styles.card__specs}>
        <p className={styles.card__spec}>
          <span className={styles.card__label}>Screen</span>
          <span className={styles.card__value}>{product.screen}</span>
        </p>
        <p className={styles.card__spec}>
          <span className={styles.card__label}>Capacity</span>
          <span className={styles.card__value}>{product.capacity}</span>
        </p>
        <p className={styles.card__spec}>
          <span className={styles.card__label}>RAM</span>
          <span className={styles.card__value}>{product.ram}</span>
        </p>
      </div>

      <div className={styles.card__buttons}>
        <button
          className={classNames(styles.card__cart, {
            [styles.card__cart_added]: isAlreadyInCart,
          })}
          onClick={() => addToCart(product)}
        >
          {isAlreadyInCart ? 'Added' : 'Add to cart'}
        </button>
        <button className={styles.card__fav} onClick={handleFavButton}>
          <span
            className={classNames(styles.card__fav_icon, {
              [styles['card__fav_icon--active']]: isInFavourites,
            })}
          ></span>
        </button>
      </div>
    </div>
  );
};
