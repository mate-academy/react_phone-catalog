import React, { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.scss';
import { Loader } from '../Loader/Loader';

type Props = {
  products : Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      data-cy="productList"
      className="productList"
    >
      <div className="productList__phones">
        {isLoading ? (
          <Loader />
        ) : (
          products?.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isHotPrice={false}
            />
          ))
        )}
      </div>
    </div>
  );
};
