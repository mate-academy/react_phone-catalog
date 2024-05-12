import React from 'react';
import ProductPage from '../../components/ProductPage/ProductPage';
import { Product } from '../../types/Product';

type Props = {
  product: Product[];
};

const AccessoriesPage: React.FC<Props> = ({ product }) => {
  return <ProductPage product={product} title={`Accessories`} />;
};

export default AccessoriesPage;
