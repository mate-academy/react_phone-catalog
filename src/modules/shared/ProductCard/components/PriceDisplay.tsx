import { FC } from 'react';
import { Product } from '../../../../types/Product';
import { DisplayType } from '../types/types';

export const PriceDisplay: FC<{
  product: Product;
  displayType: DisplayType;
}> = ({ product, displayType }) => (
  <div className="productCard__container-price">
    {displayType === 'fullPrice' ? (
      <span className="productCard__price-regular-without-discount">
        ${product.fullPrice}
      </span>
    ) : (
      <>
        <span className="productCard__price-discount">${product.price}</span>
        <span className="productCard__price-regular">${product.fullPrice}</span>
      </>
    )}
  </div>
);
