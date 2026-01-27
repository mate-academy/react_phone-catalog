import { NavLink } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCardDiscount.module.scss';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

type Props = {
  product: Product;
};

export const ProductCardDiscount: React.FC<Props> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();

  return (
    <div className={styles.card}>
      <NavLink to={`/product/${product.itemId}`} className={styles.card__link}>
        <img
          src={product.image}
          alt={product.itemId}
          className={styles.card__img}
        />
        <div className={styles.card__title}>{product.name}</div>
      </NavLink>
      <div className={styles.card__prices}>
        {product.fullPrice - product.price === 0 ? (
          <div className={styles.card__prices__price}>${product.fullPrice}</div>
        ) : (
          <>
            <div className={styles.card__prices__price}>${product.price}</div>
            <div className={styles.card__prices__full}>
              ${product.fullPrice}
            </div>
          </>
        )}
      </div>
      <div className={styles.card__divider}></div>
      <ul className={styles.card__specs}>
        <li className={styles.card__specs__item}>
          <span className={styles.card__specs__name}>Screen</span>
          <span className={styles.card__specs__value}>{product.screen}</span>
        </li>

        <li className={styles.card__specs__item}>
          <span className={styles.card__specs__name}>Capacity</span>
          <span className={styles.card__specs__value}>{product.capacity}</span>
        </li>

        <li className={styles.card__specs__item}>
          <span className={styles.card__specs__name}>RAM</span>
          <span className={styles.card__specs__value}>{product.ram}</span>
        </li>
      </ul>
      <div className={styles.card__buttons}>
        <button
          className={`${styles.card__addButton} ${
            isInCart(product.itemId)
              ? styles['card__addButton--added']
              : styles['card__addButton--add']
          }`}
          onClick={() => addToCart(product.itemId)}
          disabled={isInCart(product.itemId)}
        >
          {isInCart(product.itemId) ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={`${styles.card__buttonFav} ${
            isFavorite(product.itemId)
              ? styles['card__buttonFav--added']
              : styles['card__buttonFav--add']
          }`}
          onClick={() => toggleFavorite(product)}
        >
          <img
            src={
              isFavorite(product.itemId)
                ? '/public/img/icons/icon-heart-filled.svg'
                : '/public/img/icons/icon-heart.svg'
            }
            alt="icon-heart"
            className={styles.card__buttonFav__icon}
          />
        </button>
      </div>
    </div>
  );
};
