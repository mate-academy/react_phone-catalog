import { Product } from './Product';
import { ProductDetailsType } from './ProductDetailsType';
import { DropdownIterface, Option } from './sortENUM';

export interface ContextType {
  products: Product[] | null;
  setProducts: (x: Product[]) => void;
  setCurrentOption: (x: Option, y: string) => string;
  sortDropdown: DropdownIterface;
  perPageDropdown: DropdownIterface;
  sort: string;
  perPage: string;
  favouriteProducts: string[] | null;
  setFavouriteProducts: (x: string[]) => void;
  productDetails: ProductDetailsType | null;
  setProductsDetails: (x: ProductDetailsType) => void;
  pageURL: string | null;
  query: string;
}
