import { ProductSummary } from './ProductSummary';

export type Category = {
  id: string;
  title: string;
  bannerImg: string;
  products: ProductSummary[];
  productsCount: number;
};
