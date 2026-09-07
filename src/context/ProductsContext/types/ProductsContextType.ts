// eslint-disable-next-line max-len
import { Categories } from '../../../modules/HomePage/components/Models/components/Main/components/Model/components/FirstPart/types/Categories';
import { Gadget } from '../../../types/CategoriesTypes/Gadget';
import { Product } from '../../../types/CategoriesTypes/Product';
import { ProductsCache } from '../../../types/CategoriesTypes/ProductsCache';
import { CustomLocation } from '../../../types/CustomLocation';
import { CurrentProduct } from './CurrentProduct';

export interface ProductsContextType {
  products: Product[];
  suggestedProducts: Product[];
  suggestedProductsCache: ProductsCache;
  phones: Gadget[];
  tablets: Gadget[];
  accessories: Gadget[];
  categories: Categories;
  currentProduct: CurrentProduct | null;
  comebackLocations: CustomLocation[];
  IMAGE_PARAM: string;
  searchImageParam: string | null;
  currentImage: string;
  setCurrentImage: (value: string) => void;
  setComebackLocations: React.Dispatch<React.SetStateAction<CustomLocation[]>>;
  setCurrentProduct: (value: CurrentProduct | null) => void;
  getCardWidth: () => '232px' | '237px' | '248px';
  getTitle: (value: string, toIndex: number) => string;
}
