import { StorageProduct } from './StorageProduct';

export interface StorageItem {
  id: number;
  quantity: number;
  product: StorageProduct;
}
