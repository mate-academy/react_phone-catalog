import React from 'react';
import { Product, ProductDetails } from '../../../../types/Product';
import { ProductOptions } from '../ProductOptions';
import styles from './ProductInfo.module.scss';

type Props = {
  currentProduct: Product;
  productDetails: ProductDetails;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
};

export const ProductInfo: React.FC<Props> = ({
  currentProduct,
  productDetails,
  onColorChange,
  onCapacityChange,
}) => {
  return (
    <div className={styles.productInfo}>
      <ProductOptions
        product={currentProduct}
        productDetails={productDetails}
        onColorChange={onColorChange}
        onCapacityChange={onCapacityChange}
      />
    </div>
  );
};
