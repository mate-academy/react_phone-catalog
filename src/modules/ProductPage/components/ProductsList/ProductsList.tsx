import React from 'react';
import { ProductCart } from '../../../shared/components/ProductCart';
import cn from 'classnames';

interface Props {
  productsToShow: Product[] | null;
  additionalClass?: string;
}

export const ProductList: React.FC<Props> = ({
  productsToShow,
  additionalClass = '',
}) => {
  if (!productsToShow) {
    return;
  }

  return (
    <div className={cn('productsToShow', additionalClass)}>
      {productsToShow?.map(product => (
        <ProductCart
          key={product.id}
          product={product}
          prevPrice={product.fullPrice}
          currentPrice={product.price}
          additionalClass="productsToShow__product"
        />
      ))}
    </div>
  );
};
