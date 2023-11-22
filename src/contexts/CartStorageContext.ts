import { createContext } from 'react';

import { CartType } from '../types/CartType';

export const CartStorageContext = createContext<CartType[]>([]);
