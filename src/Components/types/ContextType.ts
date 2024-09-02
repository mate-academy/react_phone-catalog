import { FilterType } from './FilterType';
import { HotPricesProduct } from './HotPricesProducts';
import { PhonesType } from './phones';
import { Product } from './Product';

export type ContextType = {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  phones: PhonesType[];
  setPhones: (phones: PhonesType[]) => void;
  hotPricesProducts: HotPricesProduct[];
  setHotPricesProducts: (hotPricesProducts: HotPricesProduct[]) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
};
