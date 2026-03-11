import React from 'react';
import styles from './ProductActions.module.scss';
import { ProductDetails } from '../../../../types/ProductDetails';
import { ProductConfig } from '../ProductConfig/ProductConfig';
import { TechSpecs } from '../../../shared/components/TechSpecs';
import { ActionButtons } from '../../../shared/components/ActionButtons';

interface Props {
  product: ProductDetails;
  baseId?: number;
}

export const ProductActions: React.FC<Props> = ({ product, baseId }) => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <ProductConfig product={product} />

        <div className={styles.priceBlock}>
          <span className={styles.priceDiscount}>${product.priceDiscount}</span>
          <span className={styles.priceRegular}>${product.priceRegular}</span>
        </div>

        <div className={styles.buttonsRow}>
          <ActionButtons product={product} size="large" />
        </div>

        <div className={styles.shortSpecs}>
          <div className={styles.shortSpecs}>
            <TechSpecs product={product} variant="short" />
          </div>
        </div>
      </div>

      <div className={styles.productId}>ID: {baseId || 'N/A'}</div>
    </div>
  );
};
