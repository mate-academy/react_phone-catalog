import React from 'react';
import { ProductDetails } from '../../../../types';

type Props = {
  productDetails: ProductDetails;
};

export const ProductPrice: React.FC<Props> = ({ productDetails }) => (
  <div className="product-details__price">
    <h2 className="product-details__price--discount">
      ${productDetails.priceDiscount}
    </h2>
    <h2 className="product-details__price--regular">
      ${productDetails.priceRegular}
    </h2>
  </div>
);
