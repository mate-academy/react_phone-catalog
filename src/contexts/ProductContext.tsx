import React from 'react';
import { Product } from 'src/types/Product';

export const ProductContext = React.createContext<Product[]>([]);
