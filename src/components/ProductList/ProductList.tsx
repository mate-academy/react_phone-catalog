import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
// import { Phones } from '../../types/Phones';
import './productList.scss';
import { Products } from '../../types/Products';

type ProductListProps = {
  dataProducts: Products[]
};

export const ProductList: React.FC<ProductListProps> = ({ dataProducts }) => {
  return (
    <div className="productList">
      <div className="productList__list">
        {dataProducts.map(product => (
          <ProductCard
            key={product.id}
            productData={product}
          />
        ))}
      </div>

    </div>
  );
};
