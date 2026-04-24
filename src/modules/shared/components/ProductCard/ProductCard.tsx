import { Product } from '../../../../types';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { name, price, fullPrice, image, screen, capacity, ram } = product;
  const hasDiscount = price !== fullPrice;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} />
      </div>

      <p className={styles.name}>{name}</p>

      <div className={styles.prices}>
        <span className={styles.price}>${price}</span>
        {hasDiscount && <span className={styles.fullPrice}>${fullPrice}</span>}
      </div>

      <hr className={styles.divider} />

      <ul className={styles.specs}>
        <li className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{screen}</span>
        </li>
        <li className={styles.specRow}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{capacity}</span>
        </li>
        <li className={styles.specRow}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{ram}</span>
        </li>
      </ul>

      <div className={styles.buttons}>
        <button className={styles.addToCart}>Add to cart</button>
        <button className={styles.favourites} aria-label="Add to favourites">
          <img src="public/img/icons/Favourites.svg" alt="Favourites" />
        </button>
      </div>
    </article>
  );
};
