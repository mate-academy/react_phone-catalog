import { createContext, useContext } from 'react';
import type { Accessory } from '../types/Accessory';

export const AccessoriesContext = createContext<Accessory[]>([]);

export const useAccessories = () => useContext(AccessoriesContext);
