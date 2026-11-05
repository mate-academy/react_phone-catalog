import type { Product } from '@/shared/types';

export type ProductsSlidesData = {
  sectionTitle: string;
  sectionSubTitle?: string;
  productCards: Product[];
  isLoading?: boolean;
};
