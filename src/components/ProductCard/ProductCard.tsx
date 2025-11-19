import { Link } from 'react-router-dom';
import { Product } from '../../types/Products';
import styles from './ProductCard.module.scss';

type ProductCardProps = {
  product: Product;
  hotPrice?: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  hotPrice = false,
}) => {
  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.card__img}
      />

      <h3 className={styles.card__title}>{product.name}</h3>

      <p className={styles.card__price}>
        <span className={styles.card__price_newPrice}>
          ${product.price.toLocaleString()}
        </span>

        {hotPrice && (
          <span className={styles.card__price_oldPrice}>
            ${product.fullPrice.toLocaleString()}
          </span>
        )}
      </p>

      <span className={styles.card__line}></span>

      <div className={styles.card__specs}>
        <div className={styles.card__specRow}>
          <span className={styles.card__specRow_label}>Screen:</span>
          <span>{product.screen}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specRow_label}>Capacity:</span>
          <span>{product.capacity}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specRow_label}>RAM:</span>
          <span>{product.ram}</span>
        </div>
      </div>

      <div className={styles.card__btn}>
        <button
          className={styles.card__btn_cart + ' ' + styles.card__btn_primary}
          type="button"
          data-cy="add-to-cart"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            // eslint-disable-next-line no-console
            console.log('Add to cart');
          }}
        >
          Add to cart
        </button>

        <button
          className={styles.card__btn_fav + ' ' + styles.card__btn_secondary}
          type="button"
          data-cy="favorite"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            // eslint-disable-next-line no-console
            console.log('Add to favorites');
          }}
        >
          <img
            src="/img/Favorites Hurt.png"
            alt="favorite"
            className={styles.card__btn_fav_img}
          />
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
