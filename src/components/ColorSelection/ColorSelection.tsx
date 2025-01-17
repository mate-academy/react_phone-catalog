import React from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import styles from './ColorSelection.module.scss';
import classNames from 'classnames';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductColors } from '../../constants/productColors';
import { Product } from '../../types/Product';

type Props = {
  selectedProduct: ProductDetails | undefined;
  products: Product[];
};

export const ColorSelection: React.FC<Props> = React.memo(
  ({ selectedProduct, products }) => {
    const colors = selectedProduct?.colorsAvailable || [];
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { t } = useTranslation();
    const { productId } = useParams();

    const setColor = (newColor: keyof ProductColors) => {
      const encodedColor = encodeURIComponent(newColor).replace(/%20/g, '-');

      const updatedPath = pathname.replace(
        /-([a-zA-Z-]+)$/,
        `-${encodedColor}`,
      );

      navigate(updatedPath);
    };

    const newSelectedItemId = products.find(
      productItem => productItem.itemId === productId?.slice(1),
    );

    return (
      <div className={styles.colorSelection}>
        <div className={styles.container}>
          <p className={styles.title}>{t('colorSelection.title')}</p>
          <p className={styles.id}>{`ID: 803${newSelectedItemId?.id}`}</p>
        </div>

        <ul className={styles.list}>
          {colors.map(color => {
            return (
              <li
                className={classNames(styles.item, {
                  [styles.item__active]: selectedProduct?.color === color,
                })}
                key={color}
              >
                <div
                  className={styles.circle}
                  style={{ backgroundColor: color }}
                  onClick={() => setColor(color)}
                ></div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);

ColorSelection.displayName = 'ColorSelection';
