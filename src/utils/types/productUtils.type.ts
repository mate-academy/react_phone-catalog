import { TProductBase } from '@utils/types/productBase.type';

export type TNewItemId = {
  category: string;
  capacity: string;
  color: string;
  nameSpaceId: string;
  productsWithDetails: TProductBase[];
};

export type TUpdateProductParams = {
  selectedProduct: TProductBase;
  newCapacity?: string;
  newColor?: string;
  productsWithDetails: TProductBase[];
  navigate: (url: string, options: { state: { itemId: string } }) => void;
};
