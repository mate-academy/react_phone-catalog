import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ProductPrice.module.scss';

type TProps = {
  price?: number;
  fullPrice?: number;
  discount?: boolean;
};

export const ProductPrice: FC<TProps> = ({
  price,
  fullPrice,
  discount = false,
}) => {
  const { t } = useTranslation();
  const localMain = t('price.main', { val: price });
  const localOriginal = t('price.main', { val: fullPrice });

  return (
    <div className={styles.prices}>
      <span aria-label={localMain}>${price}</span>
      {discount && (
        <span className={styles.discount} aria-label={localOriginal}>
          ${fullPrice}
        </span>
      )}
    </div>
  );
};
