import { Dispatch, SetStateAction } from 'react';
import { Product } from './Product';
import { Error } from './Error';
import { ProductDetailsType } from './ProductDetails';

export type ContextValue = {
  products: Product[],
  selectedProduct: ProductDetailsType,
  cart: Product[],
  favorite: Product[],
  error: Error | null,
  isLoading: boolean;
  setProducts: Dispatch<SetStateAction<Product[]>>,
  setSelectedProduct: Dispatch<SetStateAction<ProductDetailsType>>,
  setCart: Dispatch<SetStateAction<Product[]>>,
  setFavorite: Dispatch<SetStateAction<Product[]>>,
  setError: Dispatch<SetStateAction<Error | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
};
