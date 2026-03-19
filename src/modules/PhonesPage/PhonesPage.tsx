import React from 'react';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../utils/products';
import { CatalogPageContent } from '../shared/components/CatalogPageContent';

type Props = {
  products: Product[];
};

export const PhonesPage: React.FC<Props> = ({ products }) => {
  const phones = getProductsByCategory(products, 'phones');

  return <CatalogPageContent title="Mobile phones" products={phones} />;
};
