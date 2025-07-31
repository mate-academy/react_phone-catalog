import { createContext, useContext } from 'react';
import type { Tablet } from '../types/Tablet';

export const TabletsContext = createContext<Tablet[]>([]);

export const useTablets = () => useContext(TabletsContext);
