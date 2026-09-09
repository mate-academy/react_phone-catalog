import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import favouritesIcon from '../../assets/icons/favourites.svg';
import favouritesFilledIcon from '../../assets/icons/favourites-filled.svg';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  // Hot prices показывает старую цену зачёркнутой, Brand new — нет
  showFullPrice?: boolean;
};

export const ProductCard = ({ product, showFullPrice }: Props) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const inCart = isInCart(product.id);
  const favorite = isFavorite(product.id);
  const detailsUrl = `/product/${product.itemId}`;

  return (
    <div className={styles.card}>
      <Link to={detailsUrl} className={styles.imageLink}>
        <img
          className={styles.image}
          src={`./${product.image}`}
          alt={product.name}
        />
      </Link>

      <h3 className={styles.name}>
        <Link to={detailsUrl} className={styles.nameLink}>
          {product.name}
        </Link>
      </h3>

      <p className={styles.price}>
        ${product.price}
        {showFullPrice && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </p>

      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={classNames(styles.addToCart, {
            [styles.addToCartAdded]: inCart,
          })}
          onClick={() => addToCart(product)}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={styles.favorite}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={favorite}
          onClick={() => toggleFavorite(product)}
        >
          <img src={favorite ? favouritesFilledIcon : favouritesIcon} alt="" />
        </button>
      </div>
    </div>
  );
};
