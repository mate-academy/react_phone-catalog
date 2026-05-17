import style from './ProductsList.module.scss';
import { ProductCard } from '../ProductCard';
import React from 'react';
import { ProdCard } from '../../types/Product';

type ProductListProps = {
  products: ProdCard[];
};

export const ProductList: React.FC<ProductListProps> = React.memo(
  ({ products }) => {
    return (
      <div className={style.listContainer}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    );
  },
);

ProductList.displayName = 'ProductList';
