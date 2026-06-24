import { Link } from 'react-router-dom';

import type { Product } from '../../types/product';
import { useCart, useFavorites } from '../../context';
import styles from './ProductCard.module.scss';

const HEART_PATH =
  'M8 13c-.24 0-.47-.09-.65-.25C5.48 11.13 2 8.09 2 5.25 ' +
  '2 3.46 3.4 2 5.12 2 6.16 2 7.13 2.53 7.7 3.39L8 3.84l.3-.45' +
  'C8.87 2.53 9.84 2 10.88 2 12.6 2 14 3.46 14 5.25c0 2.84-3.48 ' +
  '5.88-5.35 7.5-.18.16-.41.25-.65.25z';

type Props = {
  product: Product;
  showFullPrice?: boolean;
  onOpen?: () => void;
};

type SpecRowProps = {
  label: string;
  value: string;
};

const SpecRow = ({ label, value }: SpecRowProps) => (
  <div className={styles.specRow}>
    <span className={styles.specLabel}>{label}</span>
    <span className={styles.specValue}>{value}</span>
  </div>
);

export const ProductCard = ({
  product,
  showFullPrice = true,
  onOpen,
}: Props) => {
  const { itemId, name, image, price, fullPrice, screen, capacity, ram } =
    product;

  const { isFavorite, toggle } = useFavorites();
  const { isInCart, add } = useCart();
  const hasDiscount = showFullPrice && fullPrice > price;

  return (
    <article className={styles.card}>
      <Link
        to={`/product/${itemId}`}
        className={styles.imageLink}
        aria-label={name}
        onClick={onOpen}
      >
        <img
          src={`${import.meta.env.BASE_URL}${image}`}
          alt={name}
          className={styles.image}
          loading="lazy"
        />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.name} onClick={onOpen}>
        {name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${price}</span>
        {hasDiscount && <span className={styles.fullPrice}>${fullPrice}</span>}
      </div>

      <hr className={styles.divider} />

      <div className={styles.specs}>
        <SpecRow label="Screen" value={screen} />
        <SpecRow label="Capacity" value={capacity} />
        <SpecRow label="RAM" value={ram} />
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={
            isInCart(itemId)
              ? `${styles.cartButton} ${styles.cartButtonAdded}`
              : styles.cartButton
          }
          disabled={isInCart(itemId)}
          onClick={() => add(itemId)}
        >
          {isInCart(itemId) ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={
            isFavorite(itemId)
              ? `${styles.favoriteButton} ${styles.favoriteButtonActive}`
              : styles.favoriteButton
          }
          aria-label={`Add ${name} to favorites`}
          onClick={() => toggle(itemId)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={HEART_PATH}
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </article>
  );
};
