import styles from './CardProduct.module.scss';
import { ProductType } from '../../types/ProductType';
import { Link } from 'react-router-dom';

type Props = {
  product: ProductType;
};

export const CartProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.pc__product_card}>
      <div className={styles.pc__image_container}>
        <Link to={`/${product.category}/${product.itemId}`}>
          <img className="pc__image" src={product.image} alt={product.name} />
        </Link>
      </div>
      <div className={styles.pc__name}>
        <Link to={`/${product.category}/${product.itemId}`}>
          {product.name}
        </Link>
      </div>
      <div className={styles.pc__price}>{`$${product.fullPrice}`}</div>
      <div className={styles.pc__divider}></div>
      <div className={styles.pc__screen}>
        <span>Screen</span>
        <span>{product.screen}</span>
      </div>
      <div className={styles.pc__capacity}>
        <span>Capacity</span>
        <span>{product.capacity}</span>
      </div>
      <div className={styles.pc__ram}>
        <span>RAM</span>
        <span>{product.ram}</span>
      </div>
    </div>
  );
};
