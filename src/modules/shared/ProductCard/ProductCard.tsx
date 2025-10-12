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
    <div className={styles.specLine}>
      <h3>{product.name}</h3>
      <img className={styles.image} src={product.image} alt={product.name} />
      <div className={styles.prices}>
        <p className={styles.newPrice}>{CURRENCY_SYMBOL + product.price}</p>
        <p className={styles.oldPrice}>{CURRENCY_SYMBOL + product.fullPrice}</p>
      </div>

      <div>
        <p className={styles.specLine}>
          <span>{t('product-card.screen')}</span>
          <span>{product.screen}</span>
        </p>
        <p className={styles.specLine}>
          <span>{t('product-card.capacity')}</span>
          <span>{product.capacity}</span>
        </p>
        <p className={styles.specLine}>
          <span>{t('product-card.ram')}</span>
          <span>{product.ram}</span>
        </p>
        <div className={styles.bottom}></div>
      </div>
    </div>
  );
};

export default ProductCard;
