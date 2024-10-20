import { OldProductType } from './OldProductType';

export type OldProduct = {
  age: number;
  id: string;
  type: string;
  imageUrl: string;
  name: string;
  snippet: string;
  price: number;
  discount: number;
  screen: string;
  amountOfModels: number;
  capacity: string;
  ram: string;
  productData: OldProductType | null;
};
