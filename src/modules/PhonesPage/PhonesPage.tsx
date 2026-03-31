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

export const PhonesPage: React.FC<Props> = ({
  products,
  favourites,
  onToggleFavourite,
  onAddToCart,
}) => {
  const phones = getProductsByCategory(products, 'phones');

  return (
    <CatalogPageContent
      title="Mobile phones"
      breadcrumb="Phones"
      products={phones}
      favourites={favourites}
      onToggleFavourite={onToggleFavourite}
      onAddToCart={onAddToCart}
    />
  );
};
