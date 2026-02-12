import React from 'react';
import style from './ProductPrice.module.scss';
import { ProductDetailsType } from '../../types/ProductDetailsType';

interface Props {
  productDetails: ProductDetailsType;
}

export const ProductPrice: React.FC<Props> = ({ productDetails }) => {
  return (
    <div className={style.product_details__price}>
      <h2 className={style.product_details__price_regular}>
        ${productDetails.priceRegular}
      </h2>
      <h2 className={style.product_details__price_discaunt}>
        ${productDetails.priceDiscount}
      </h2>
    </div>
  );
};
