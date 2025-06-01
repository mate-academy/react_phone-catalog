import { createContext } from 'react';
import { Phone } from './types/apiTypes';

export const PhoneContext = createContext<Phone[] | undefined>(undefined);
