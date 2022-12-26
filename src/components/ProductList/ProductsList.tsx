import { FC } from 'react';
import { ProductCardLoader } from '../UI/Loaders/ProductCardLoader';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductList.scss';

type Props = {
  products: Product[];
  isLoaded: boolean;
};

export const ProductsList: FC<Props> = ({ products, isLoaded }) => {
  return (
    <div className="product-list" data-cy="productList">
      {!isLoaded ? (
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
