import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <div className={styles.card}>
      <img src={product.image} className={styles.cardImage}></img>
      <p className={styles.cardTitle}>{`${product.name} (iMT9G2FS/A)`}</p>
      <div className={styles.cardPrice}>{`$${product.price}`}</div>
      <div className={styles.cardProperties}>
        <div className={styles.cardProperty}>
          <span className={styles.cardPropertyName}>Screen</span>
          <span className={styles.cardPropertyValue}>{product.screen}</span>
        </div>
        <div className={styles.cardProperty}>
          <span className={styles.cardPropertyName}>Capacity</span>
          <span className={styles.cardPropertyValue}>{product.capacity}</span>
        </div>
        <div className={styles.cardProperty}>
          <span className={styles.cardPropertyName}>RAM</span>
          <span className={styles.cardPropertyValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.cardButtons}>
        <button className={styles.cardAddButton}>Add to a cart</button>
        <button className={styles.cardFavButton}>
          <img src="/img/icons/favourite-default.svg" alt="favourites" />
        </button>
      </div>
    </div>
  );
};
