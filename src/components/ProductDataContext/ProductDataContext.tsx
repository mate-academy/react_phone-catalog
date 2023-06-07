import React from 'react';
import { Product } from '../../types/Products';

export const ProductDataContext = React.createContext<Product []>([]);
