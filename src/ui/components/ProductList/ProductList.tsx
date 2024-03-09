import React from 'react';

import { ProductCard } from '../ProductCard';

import { Product } from '../../../types/Product';

import './ProductList.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="products">
      <ul className="products__list">
        {products.map(product => (
          <li key={product.itemId} className="products__item">
            <ProductCard
              id={product.id}
              item={product}
              name={product.name}
              productUrl={product.itemId}
              price={product.price}
              fullPrice={product.fullPrice}
              image={product.image}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
