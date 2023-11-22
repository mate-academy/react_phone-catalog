import { createContext } from 'react';

import { Phone } from '../types/Phone';

export const FavouritesStorageContext = createContext<Phone[]>([]);
