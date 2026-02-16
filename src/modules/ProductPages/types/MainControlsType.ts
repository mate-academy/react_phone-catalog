import { ProductPage } from '../../../shared/types/ProductPage';
import { ProductType } from '../../../shared/types/ProductType';

export type MainControlsType = {
  products: ProductType;
  colors: string[];
  activeColor: string;
  capacitys: string[];
  activeCapacity: string;
  onColor: (value: string) => void;
  onCapacity: (value: string) => void;
  itemsProducts?: ProductPage[];
};
