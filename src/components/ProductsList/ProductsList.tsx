import { FC, useState } from 'react';
import { CatalogProduct } from '../../types/CatalogProduct';
import { ProductItem } from '../ProductItem/ProductItem';
import { FavoriteItem } from '../../types/FavoriteItem';

import './ProductsList.scss';

type Props = {
  products: CatalogProduct[] | FavoriteItem[];
  isSlider: boolean;
};

export const ProductsList: FC<Props> = ({ products, isSlider }) => {
  const [isProductsList] = useState(true);

  return (
    <div
      data-cy="productList"
      className="products-page__producs products-list"
    >
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
