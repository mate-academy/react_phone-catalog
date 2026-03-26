import React from 'react';
import { ProductDetails } from '../../../../types/Product';
import { ProductOptions } from '../ProductOptions';
import styles from './ProductInfo.module.scss';

type Props = {
  productDetails: ProductDetails;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
};

export const ProductInfo: React.FC<Props> = ({
  productDetails,
  onColorChange,
  onCapacityChange,
}) => {
  return (
    <div className={styles.productInfo}>
      <ProductOptions
        productDetails={productDetails}
        onColorChange={onColorChange}
        onCapacityChange={onCapacityChange}
      />
    </div>
  );
};
