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

export const TabletsPage: React.FC<Props> = ({
  products,
  favourites,
  onToggleFavourite,
  onAddToCart,
}) => {
  const tablets = getProductsByCategory(products, 'tablets');

  return (
    <CatalogPageContent
      title="Tablets"
      breadcrumb="Tablets"
      products={tablets}
      favourites={favourites}
      onToggleFavourite={onToggleFavourite}
      onAddToCart={onAddToCart}
    />
  );
};
