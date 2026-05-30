import { FC } from 'react';
import './ProductsList.scss';
import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  displayType: 'fullPrice' | 'with-discount';
};

export const ProductsList: FC<Props> = ({ products, displayType }) => (
  <div className="productsList">
    {products.map(product => (
      <div className="productItem" key={product.id}>
        <ProductCard product={product} displayType={displayType} />
      </div>
    ))}
  </div>
);
