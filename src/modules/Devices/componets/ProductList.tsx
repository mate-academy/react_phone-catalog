import React from 'react';
import Product from './Product';
import { ProductType } from '../../../types/product';

interface ProductListProps {
  products: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="devices__list">
      {products.map(product => (
        <Product key={product.id} product={product} isHotPrices={true} />
      ))}
    </div>
  );
};

export default ProductList;
