import { ProductInfo } from './ProductInfo';

export interface ProductWithQuantity extends ProductInfo {
  quantity?: number;
}
