import { Link } from 'react-router-dom';
import { Product } from '../../../types/Product';
import styles from './ProductCard.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { withBase } from '../../../utils/withBase';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { itemId, name, price, fullPrice, screen, capacity, ram, image } =
    product;

  const hasDiscount = fullPrice > price;
  const { addToCart, items } = useCart();
  const isInCart = items.some(item => item.id === product.id);
  const { toggleFavorite, isFavorite } = useFavorites();
  const isLiked = isFavorite(product.id);

  return (
    <article className={styles.card}>
      <Link to={`/product/${itemId}`} className={styles.imageLink}>
        <img src={withBase(image)} alt={name} className={styles.image} />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.title}>
        {name}
      </Link>

      <div className={styles.price}>
        <span className={styles.priceCurrent}>${price}</span>
        {hasDiscount && <span className={styles.priceFull}>${fullPrice}</span>}
      </div>

      <ul className={styles.specs}>
        <li className={styles.specsRow}>
          <span>Screen</span>
          <span>{screen}</span>
        </li>
        <li className={styles.specsRow}>
          <span>Capacity</span>
          <span>{capacity}</span>
        </li>
        <li className={styles.specsRow}>
          <span>RAM</span>
          <span>{ram}</span>
        </li>
      </ul>

      <div className={styles.actions}>
        <button
          type="button"
          className={
            isInCart
              ? `${styles.addToCart} ${styles.addToCartActive}`
              : styles.addToCart
          }
          onClick={() => addToCart(product)}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={styles.favorite}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isLiked}
          onClick={() => toggleFavorite(product)}
        >
          <img
            src={withBase(
              isLiked ? 'img/icons/HeartFilled.svg' : 'img/icons/Stroke.svg',
            )}
            alt=""
          />
        </button>
      </div>
    </article>
  );
};
