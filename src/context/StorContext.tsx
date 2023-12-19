import React from 'react';
import { Product } from '../types/Product';

type Props = {
  product: Product[];
  loading: boolean;
  error: boolean;
};

export const StorContext = React.createContext<Props>({
  product: [],
  loading: false,
  error: false,
});
