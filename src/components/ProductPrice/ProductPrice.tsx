import React from 'react';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import style from './ProductPrice.module.scss';

interface Props {
  productDetails: ProductDetailsType;
}

export const ProductPrice: React.FC<Props> = ({ productDetails }) => {
  return (
    <div className={style.product_details__price}>
      <h2 className={style.product_details__price_discount}>
        ${productDetails.priceDiscount}
      </h2>
      <h2 className={style.product_details__price_regular}>
        ${productDetails.priceRegular}
      </h2>
    </div>
  );
};
