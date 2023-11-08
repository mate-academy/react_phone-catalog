import { FC, useState } from 'react';
import { CatalogProduct } from '../../types/CatalogProduct';
import { ProductItem } from '../ProductItem/ProductItem';

type Props = {
  products: CatalogProduct[];
  isSlider: boolean;
};

export const ProductsList: FC<Props> = ({ products, isSlider }) => {
  const [isProductsList] = useState(true);

  return (
    <div className="products-page__producs products-list">
      {products.map(product => (
        <ProductItem
          product={product}
          key={product.itemId}
          isSlider={isSlider}
          isProductsList={isProductsList}
        />
      ))}
    </div>
  );
};
