import { useTranslation } from 'react-i18next';
import styles from './ProductCard.module.scss';
import { Product } from '../../../types/product';
import { CURRENCY_SYMBOL } from '../../constants';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.product}>
      <img
        className={styles.product__image}
        src={product.image}
        alt={product.name}
      />

      <div className={styles.product__title}>{product.name}</div>

      <div className={styles.product__prices}>
        <p className={styles.product__price}>
          {CURRENCY_SYMBOL + product.price}
        </p>
        <p className={styles.product__price + ' ' + styles.product__price_old}>
          {CURRENCY_SYMBOL + product.fullPrice}
        </p>
      </div>
      <div></div>
      <div className={styles.product__specs}>
        <p className={styles.product__specLine}>
          <span className={styles.product__specText}>
            {t('product-card.screen')}
          </span>
          <span
            className={
              styles.product__specText + ' ' + styles.product__specText_bold
            }
          >
            {product.screen}
          </span>
        </p>
        <p className={styles.product__specLine}>
          <span className={styles.product__specText}>
            {t('product-card.capacity')}
          </span>
          <span
            className={
              styles.product__specText + ' ' + styles.product__specText_bold
            }
          >
            {product.capacity}
          </span>
        </p>
        <p className={styles.product__specLine}>
          <span className={styles.product__specText}>
            {t('product-card.ram')}
          </span>
          <span
            className={
              styles.product__specText + ' ' + styles.product__specText_bold
            }
          >
            {product.ram}
          </span>
        </p>
        <div className={styles.product__buttons}></div>
      </div>
    </div>
  );
};

export default ProductCard;
