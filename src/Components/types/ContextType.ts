import { FilterType } from './FilterType';
import { ItemPerPage } from './ItemPerPage';
import { OldProduct } from './OldProducts';
import { OldProductType } from './OldProductType';
import { ProductType } from './phones';
import { Product } from './Product';

export type ContextType = {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  phones: ProductType[];
  setPhones: (phones: ProductType[]) => void;
  tablets: ProductType[];
  setTablets: (tablets: ProductType[]) => void;
  accessories: ProductType[];
  setAccessories: (accessories: ProductType[]) => void;
  oldProducts: OldProduct[];
  setOldProducts: (hotPricesProducts: OldProduct[]) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  oldProductOffers: OldProductType[];
  setOldProductOffers: (oldProductOffer: OldProductType[]) => void;
  query: string;
  setQuery: (query: string) => void;
  itemsPerPage: ItemPerPage;
  setItemsPerPage: (itemsPerPage: ItemPerPage) => void;
  slidePages: number;
  setSlidePages: (slidePages: number) => void;
};
