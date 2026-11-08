import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import HeartIcon from '../../../../assets/icons/heart.svg?react';
import HeartFilledIcon from '../../../../assets/icons/heart-filled.svg?react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  showDiscount?: boolean;
}

export const ProductCard = ({ product, showDiscount = true }: Props) => {
  const { itemId, name, image, price, fullPrice, screen, capacity, ram } =
    product;

  const { isInCart, addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isAdded = isInCart(itemId);
  const isFavorited = isFavorite(itemId);

  const productUrl = `/product/${itemId}`;

  const specs = [
    { label: 'Screen', value: screen },
    { label: 'Capacity', value: capacity },
    { label: 'RAM', value: ram },
  ];

  return (
    <article className={styles.card}>
      <Link
        to={productUrl}
        className={styles.imageLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={image} alt={name} className={styles.image} />
      </Link>

      <Link to={productUrl} className={styles.title}>
        {name}
      </Link>

      <span className={styles.price}>${showDiscount ? price : fullPrice}</span>

      {showDiscount && <s className={styles.fullPrice}>${fullPrice}</s>}

      <dl className={styles.specs}>
        {specs.map(({ label, value }) => (
          <div key={label} className={styles.spec}>
            <dt className={styles.specLabel}>{label}</dt>
            <dd className={styles.specValue}>{value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.actions}>
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
    </article>
  );
};
