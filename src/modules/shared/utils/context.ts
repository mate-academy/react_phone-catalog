import { createContext } from 'react';
import { Product } from './apiTypes';

export const PhoneContext = createContext<Product[] | undefined>(undefined);
