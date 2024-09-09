import { FilterType } from './FilterType';
import { OldProduct } from './OldProducts';
import { OldProductType } from './OldProductType';
import { PhonesType } from './phones';
import { Product } from './Product';

export type ContextType = {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  phones: PhonesType[];
  setPhones: (phones: PhonesType[]) => void;
  oldProducts: OldProduct[];
  setOldProducts: (hotPricesProducts: OldProduct[]) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  oldProductOffers: OldProductType[];
  setOldProductOffers: (oldProductOffer: OldProductType[]) => void;
};
