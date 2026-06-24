import { ProductPreview } from './ProductPreview';

export type CartItem = {
  id: string;
  quantity: number;
  product: ProductPreview;
};
