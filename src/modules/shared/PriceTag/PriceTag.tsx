import styles from './PriceTag.module.scss';

import { CURRENCY_SYMBOL } from '../../constants';

interface Props {
  price: number;
  fullPrice: number;
  additionalStyles?: string;
  showDiscount?: boolean;
}

const PriceTag: React.FC<Props> = ({
  price,
  fullPrice,
  additionalStyles = '',
  showDiscount = true,
}) => (
  <div className={styles.priceTag + ' ' + additionalStyles}>
    <p className={styles.priceTag__price}>{CURRENCY_SYMBOL + price}</p>
    {showDiscount && fullPrice > price && (
      <p className={styles.priceTag__price + ' ' + styles.priceTag__price_old}>
        {CURRENCY_SYMBOL + fullPrice}
      </p>
    )}
  </div>
);

export default PriceTag;
