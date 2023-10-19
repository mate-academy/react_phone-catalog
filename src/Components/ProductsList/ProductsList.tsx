import React from 'react';
import { Product } from '../../Helpers/types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsList.scss';

type Props = {
  products: Product[],
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="ProductsList" data-cy="productList">
      <div className="ProductsList__container">
        {products.map(product => (
          <div className="ProductList__item" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
