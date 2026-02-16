import { createContext, useContext } from 'react';
import type { Phone } from '../types/Phone';

export const PhonesContext = createContext<Phone[]>([]);

export const usePhones = () => useContext(PhonesContext);
