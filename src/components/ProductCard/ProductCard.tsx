import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  showOldPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showOldPrice }) => {
  return (
    <div className={styles.productcard}>
      <div className={styles.productcard__image}>
        <img src={`./${product.image}`} alt="Product photo" />
      </div>
      <div className={styles.productcard__content}>
        <div className={styles.productcard__name}>
          <p>{product.name}</p>
        </div>
        {showOldPrice ? (
          <div className={styles.productcard__prices}>
            <p className={styles.productcard__newPrice}>${product.price}</p>
            <p className={styles.productcard__oldPrice}>${product.fullPrice}</p>
          </div>
        ) : (
          <div className={styles.productcard__price}>
            <p>${product.price}</p>
          </div>
        )}
        <div className={styles.productcard__line}></div>
        <div className={styles.productcard__detailes}>
          <div className={styles.productcard__detailesRow}>
            <span className={styles.productcard__detailesName}>Screen</span>
            <span className={styles.productcard__detailesValue}>
              {product.screen}
            </span>
          </div>
          <div className={styles.productcard__detailesRow}>
            <span className={styles.productcard__detailesName}>Capacity</span>
            <span className={styles.productcard__detailesValue}>
              {product.capacity.replace('GB', ' GB')}
            </span>
          </div>
          <div className={styles.productcard__detailesRow}>
            <span className={styles.productcard__detailesName}>RAM</span>
            <span className={styles.productcard__detailesValue}>
              {product.ram.replace('GB', ' GB')}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.productcard__buttons}>
        <button className={styles['productcard__buttons-add']}>
          Add to cart
        </button>

        <button className={styles['productcard__buttons-fav']}>
          <img src="./img/Icons/favorites.svg" alt="Add to favorites" />
        </button>
      </div>
    </div>
  );
};
