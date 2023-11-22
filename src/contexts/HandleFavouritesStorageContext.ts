import { createContext } from 'react';

import { Phone } from '../types/Phone';

export const HandleFavouritesStorageContext = (
  createContext<React.Dispatch<React.SetStateAction<Phone[]>>>(() => {})
);
