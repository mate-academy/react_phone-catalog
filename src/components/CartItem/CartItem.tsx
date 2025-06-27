import { Product } from '../../types/Product';
import styles from './CartItem.module.scss';

type Props = {
  product: Product;
};

export const CartItem = ({ product }: Props) => {
  return (
    <div className={styles.card}>
      <button className={styles.deleteButton}>
        <img src="/img/icons/close.svg" alt="close" />
      </button>
      <div className={styles.productPhoto}>
        <img
          className={styles.productPhoto_img}
          src={product.image}
          alt="productPhoto"
        />
      </div>
      <span
        className={styles.productTitle}
      >{`${product.name}(iMT9G2FS/A)`}</span>
      <div className={styles.countButtons}>
        <button className={styles.countButton}>
          <img src="/img/icons/minus.svg" alt="minus" />
        </button>
        <div className={styles.productCounter}>1</div>
        <button className={styles.countButton}>
          <img src="/img/icons/plus.svg" alt="plus" />
        </button>
      </div>
      <span className={styles.productPrice}>{`${product.price}$`}</span>
    </div>
  );
};
