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
    <div className={styles.product__product}>
      <h3>{product.name}</h3>
      <img
        className={styles.product__image}
        src={product.image}
        alt={product.name}
      />
      <div className={styles.product__prices}>
        <p className={styles.product__newPrice}>
          {CURRENCY_SYMBOL + product.price}
        </p>
        <p className={styles.product__oldPrice}>
          {CURRENCY_SYMBOL + product.fullPrice}
        </p>
      </div>

      <div>
        <p className={styles.product__specLine}>
          <span>{t('product-card.screen')}</span>
          <span>{product.screen}</span>
        </p>
        <p className={styles.product__specLine}>
          <span>{t('product-card.capacity')}</span>
          <span>{product.capacity}</span>
        </p>
        <p className={styles.product__specLine}>
          <span>{t('product-card.ram')}</span>
          <span>{product.ram}</span>
        </p>
        <div className={styles.product__bottom}></div>
      </div>
    </div>
  );
};

export default ProductCard;
