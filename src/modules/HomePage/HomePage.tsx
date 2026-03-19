import React from 'react';
import { Product } from '../../types/Product';
import { Main } from './components/Main';

type Props = {
  products: Product[];
};

export const HomePage: React.FC<Props> = ({ products }) => {
  return <Main products={products} />;
};
