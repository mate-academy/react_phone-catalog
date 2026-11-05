import type { Product } from '@/shared/types';

export type CatalogTemplateData = {
  items: Product[];
  totalItems: number;
  title: string;
  isLoading: boolean;
};
