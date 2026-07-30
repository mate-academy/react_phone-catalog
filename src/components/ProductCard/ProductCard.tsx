import { Link } from 'react-router-dom';
import { Product } from '@/types/Product';
import { getImageUrl } from '@/utils/getImageUrl';
import { useCart } from '@/context/CartContext';
import { useFavourites } from '@/context/FavouritesContext';
import { Icon } from '@/components/Icon';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard = ({ product, showDiscount = true }: Props) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavourites();

  const inCart = isInCart(product.itemId);
  const isFav = isFavourite(product.itemId);

  return (
    <article className={styles.card}>
      <Link
        to={`/product/${product.itemId}`}
        className={`${styles.imageLink} image-link`}
      >
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.name}>
        {product.name}
      </Link>

      <div className={styles.priceRow}>
        <span className={styles.price}>
          ${showDiscount ? product.price : product.fullPrice}
        </span>
        {showDiscount && product.fullPrice > product.price && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <ul className={styles.specs}>
        <li className={styles.specRow}>
          <span>Screen</span>
          <span>{product.screen}</span>
        </li>
        <li className={styles.specRow}>
          <span>Capacity</span>
          <span>{product.capacity}</span>
        </li>
        <li className={styles.specRow}>
          <span>RAM</span>
          <span>{product.ram}</span>
        </li>
      </ul>

      <div className={styles.actions}>
        <button
          type="button"
          className={[styles.addToCart, inCart ? styles.added : ''].join(' ')}
          onClick={() =>
            inCart ? removeFromCart(product.itemId) : addToCart(product)
          }
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={[
            styles.favourite,
            isFav ? styles.favouriteActive : '',
          ].join(' ')}
          aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFav}
          onClick={() => toggleFavourite(product)}
        >
          <Icon name={isFav ? 'favourites-filled' : 'favourites'} />
        </button>
      </div>
    </article>
  );
};
