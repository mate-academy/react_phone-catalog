import { Dispatch, SetStateAction } from 'react';
import { Product } from './Product';
import { CartItemType } from './CartItemType';

export type GlobalContextType = {
  products: Product[];
  isLoading: boolean;
  setIsLoading: (boolean: boolean) => void;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  localStorage: Product[];
  setLocalStorage: (value: Product[]) => void;
  setProducts: React.Dispatch<Product[]>;
  handlePerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortingOption: string;
  setSortingOption: Dispatch<SetStateAction<string>>;
  cart: CartItemType[];
  setCart: (value: CartItemType[]) => void;
  handleAddingToCart: (value: Product) => void;
  removingFromCart: (productId: string) => void;
  handleIncrease: (productId: string) => void;
  handleDecrease: (productId: string) => void;
  favList: Product[];
  setFavList: (value: Product[]) => void;
  handleAddingToFav: (newProduct: Product) => void;
};
