import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Buttons } from './Buttons/Buttons';
import { ProductInfo } from '../../Utills/types';

type Props = {
  product: ProductInfo;
  hasDiscount: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, hasDiscount }) => {
  const normalizeText = (text: string) => {
    const number = parseFloat(text);
    const unit = text.replace(/[0-9.]/g, '');

    return `${number} ${unit}`;
  };

  return (
    <div className={styles.product__card}>
      <Link
        to={`/${product.category}/product/${product.itemId}`}
        className={styles.img__container}
      >
        <img src={product.image} alt="img" className={styles.img} />
      </Link>

      <Link
        to={`/${product.category}/product/${product.itemId}`}
        className={styles.product__name}
      >
        {product.name}
      </Link>

      <div className={styles.price__container}>
        <h3 className={styles.discount}>${product.price}</h3>

        {hasDiscount && (
          <h3 className={styles.regular__price}>${product.fullPrice}</h3>
        )}
      </div>

      <div className={styles.info__container}>
        <div className={styles.item}>
          <span>Screen</span>
          <p>{product.screen}</p>
        </div>

        <div className={styles.item}>
          <span>Capacity</span>

          <p>{normalizeText(product.capacity)}</p>
        </div>

        <div className={styles.item}>
          <span>RAM</span>
          <p>{normalizeText(product.ram)}</p>
        </div>
      </div>

      <Buttons productId={product.itemId} />
    </div>
  );
};
