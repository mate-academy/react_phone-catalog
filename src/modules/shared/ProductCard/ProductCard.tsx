import { Link } from 'react-router-dom';
import { Product } from '../../../types/Product';
import styles from './ProductCard.module.scss';
import HeartIcon from '../../../assets/icons/heart.svg?react';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { itemId, name, image, price, fullPrice, screen, capacity, ram } =
    product;

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

      <p className={styles.prices}>
        <span className={styles.price}>${price}</span>
        <s className={styles.fullPrice}>${fullPrice}</s>
      </p>

      <dl className={styles.specs}>
        {specs.map(({ label, value }) => (
          <div key={label} className={styles.spec}>
            <dt className={styles.specLabel}>{label}</dt>
            <dd className={styles.specValue}>{value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.actions}>
        <button type="button" className={styles.addButton}>
          Add to cart
        </button>

        <button
          type="button"
          className={styles.favoriteButton}
          aria-label="Add to favourites"
        >
          <HeartIcon />
        </button>
      </div>
    </article>
  );
};
