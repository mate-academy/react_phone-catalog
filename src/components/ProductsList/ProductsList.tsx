import { FC, useState } from 'react';
import { CatalogProduct } from '../../types/CatalogProduct';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsList.scss';

type Props = {
  products: CatalogProduct[] | FavoriteProduct[];
  isSlider: boolean;
};

export const ProductsList: FC<Props> = ({ products, isSlider }) => {
  const [isProductsList] = useState(true);

  return (
    <div
      className="products-page__products products-list"
      data-cy="productList"
    >
      {
        products.map(product => (
          <ProductCard
            product={product}
            key={product.itemId}
            isSlider={isSlider}
            isProductsList={isProductsList}
          />
        ))
      }
    </div>
  );
};
