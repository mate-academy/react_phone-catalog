import { FC } from 'react';
import { ProductCard } from '../ProductCard';
import { ProductsListProps } from './types/types';
import './ProductsList.scss';

export const ProductsList: FC<ProductsListProps> = ({
  products,
  displayType,
}) => (
  <div className="productsList">
    {products.map(product => (
      <div className="productItem" key={product.id}>
        <ProductCard product={product} displayType={displayType} />
      </div>
    ))}
  </div>
);
