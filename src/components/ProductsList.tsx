import { FC } from 'react';
import { ProductCardLoader } from './Loaders/ProductCardLoader';
import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
  isLoading: boolean;
};

export const ProductsList: FC<Props> = ({ products, isLoading }) => {
  return (
    <div className="product-list">
      {isLoading ? (
        <>
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
          <ProductCardLoader />
        </>
      ) : (
        <>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </>
      )}
    </div>
  );
};
