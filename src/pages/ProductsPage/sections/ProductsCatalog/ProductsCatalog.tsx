import { FC } from 'react';
import {
  ProductCard,
} from 'src/pages/ProductsPage/sections/ProductCard/ProductCard';
import { Product } from 'src/types/Product';
import './ProductsCatalog.scss';

type Props = {
  currentItems: Product[],
};

export const ProductsCatalog: FC<Props> = ({
  currentItems,
}) => {
  return (
    <div className="product-section__catalog" data-cy="productList">
      {currentItems.map(product => {
        return (
          <ProductCard
            key={product.id}
            isSlide={false}
            product={product}
          />
        );
      })}
    </div>
  );
};
