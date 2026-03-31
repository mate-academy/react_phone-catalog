import React from 'react';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../utils/products';
import { CatalogPageContent } from '../shared/components/CatalogPageContent';

type Props = {
  products: Product[];
  favourites: Product[];
  onToggleFavourite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

export const AccessoriesPage: React.FC<Props> = ({
  products,
  favourites,
  onToggleFavourite,
  onAddToCart,
}) => {
  const accessories = getProductsByCategory(products, 'accessories');

  return (
    <CatalogPageContent
      title="Accessories"
      breadcrumb="Accessories"
      products={accessories}
      favourites={favourites}
      onToggleFavourite={onToggleFavourite}
      onAddToCart={onAddToCart}
    />
  );
};
