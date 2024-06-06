import React from 'react';
import './ProductList.scss';
import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="prlist">
      {products.map(item => (
        <div className="prlist__item" key={item.id}>
          <ProductCard product={item} discount={true} />
        </div>
      ))}
    </div>
  );
};
