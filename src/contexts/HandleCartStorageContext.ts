import { createContext } from 'react';

import { CartType } from '../types/CartType';

export const HandleCartStorageContext = (
  createContext<React.Dispatch<React.SetStateAction<CartType[]>>>(() => {})
);
