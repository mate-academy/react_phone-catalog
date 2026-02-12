import { ProductCategory } from './ProductCategory';

type BaseSnapshot = {
  name: string;
  price: number;
  image: string;
};

export type PhoneSnapshot = BaseSnapshot & {
  category: ProductCategory.phones;
  screen: string;
  ram: string;
};

export type TabletSnapshot = BaseSnapshot & {
  category: ProductCategory.tablets;
  screen: string;
  ram: string;
};

export type AccessorySnapshot = BaseSnapshot & {
  category: ProductCategory.accessories;
  compatibility: string;
};

export type ProductSnapshot =
  | PhoneSnapshot
  | TabletSnapshot
  | AccessorySnapshot;
