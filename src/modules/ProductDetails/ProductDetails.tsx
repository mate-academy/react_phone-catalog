import React from 'react';
import { ProductOptions } from '../ProductOptions';
import { ProductSlider } from '../ProductSlider';
import { Gadget } from '../../utils/types/Gadget';
import styles from './ProductDetails.module.scss';
import { ProductInfo } from '../ProductInfo';
import { Product } from '../../utils/types/Product';

type Props = {
  currentGadget: Gadget;
  product: Product;
};

export const ProductDetails: React.FC<Props> = ({ currentGadget, product }) => {
  const { images } = currentGadget;

  return (
    <div className={styles.ProductDetails}>
      <div className="container">
        <div className={styles.ProductDetails__wrapper}>
          <ProductSlider images={images} />
          <ProductOptions currentGadget={currentGadget} product={product} />
        </div>
        <ProductInfo currentGadget={currentGadget} />
      </div>
    </div>
  );
};
