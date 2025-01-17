import React from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import styles from './CapacitySelection.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Product } from '../../types/Product';
import { useNavigate, useLocation } from 'react-router-dom';

type Props = {
  selectedProduct: ProductDetails | undefined;
  products: Product[];
};

export const CapacitySelection: React.FC<Props> = React.memo(
  ({ selectedProduct }) => {
    const capacities = selectedProduct?.capacityAvailable || [];
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const setCapacity = (newCapacity: string) => {
      const capacityPattern = /-(\d+[a-z]*(mm|gb|tb))/i;
      const encodedCapacity = encodeURIComponent(
        newCapacity.toLowerCase(),
      ).replace(/%20/g, '-');

      if (capacityPattern.test(pathname)) {
        const updatedPath = pathname.replace(
          capacityPattern,
          `-${encodedCapacity}`,
        );

        navigate(updatedPath);
      }
    };

    return (
      <div className={styles.capacitySelection}>
        <div className={styles.container}>
          <p className={styles.title}>{t('capacitySelection.title')}</p>
        </div>

        <ul className={styles.list}>
          {capacities.map(itemCapacity => (
            <li
              className={classNames(styles.item, {
                [styles.item__active]:
                  selectedProduct?.capacity === itemCapacity,
              })}
              key={itemCapacity}
            >
              <div
                className={styles.button}
                onClick={() => setCapacity(itemCapacity)}
              >
                {itemCapacity}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

CapacitySelection.displayName = 'CapacitySelection';
