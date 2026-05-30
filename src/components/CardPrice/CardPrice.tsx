import { Accessory } from '../../types/AccessorieTypes';
import { Phone } from '../../types/PhoneTypes';
import { Product } from '../../types/ProductTypes';
import { Tablet } from '../../types/TabletType';
import styles from '../CardPrice/CardPriceStyles.module.scss';

type Props = {
  product: Product | Phone | Tablet | Accessory;
  isExtended?: boolean;
};

export const CardPrice: React.FC<Props> = ({ product, isExtended }) => {
  const currentPrice =
    'priceDiscount' in product ? product.priceDiscount : 'price' in product ? product.price : 0;

  const oldPrice =
    'priceRegular' in product
      ? product.priceRegular
      : 'fullPrice' in product
        ? product.fullPrice
        : currentPrice;

  return (
    <h3 className={isExtended ? styles.extendedPriceWrapper : styles.new_price}>
      ${currentPrice}{' '}
      <span className={isExtended ? styles.extendedDiscountWrapper : styles.old_price}>
        ${oldPrice}
      </span>
    </h3>
  );
};
