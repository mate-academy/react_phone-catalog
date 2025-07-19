import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${product.category}/product/${product.itemId}`)}
      className={styles.card}
    >
      <img src={product.image} className={styles.cardImage}></img>
      <p className={styles.cardTitle}>{`${product.name} (iMT9G2FS/A)`}</p>
      <div className={styles.cardPrice}>
        <span>{`$${product.price}`}</span>
        <span className={styles.cardPrice_full}>{`$${product.fullPrice}`}</span>
      </div>
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
        <button
          type="button"
          className={styles.cardAddButton}
          onClick={e => {
            e.stopPropagation();
            // логика добавления в корзину
          }}
        >
          Add to a cart
        </button>
        <button
          type="button"
          className={styles.cardFavButton}
          onClick={e => {
            e.stopPropagation();
            // логика добавления в корзину
          }}
        >
          <img src="/img/icons/favourite-default.svg" alt="favourites" />
        </button>
      </div>
    </div>
  );
};
