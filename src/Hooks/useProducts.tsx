import { useContext } from 'react';
import { ProductsContext } from '../Components/context/ProductsContext';

export const useProducts = () => useContext(ProductsContext);
