import React from 'react';
import { Product } from '../types/Propduct';

export const Favorite = React.createContext<Product[]>([]);
