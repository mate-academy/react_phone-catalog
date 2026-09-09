import { ProductCategory } from '../types/Product';

type CategoryConfig = {
  title: string;
  breadcrumb: string;
  emptyText: string;
};

export const categories: Record<ProductCategory, CategoryConfig> = {
  phones: {
    title: 'Mobile phones',
    breadcrumb: 'Phones',
    emptyText: 'There are no phones yet',
  },
  tablets: {
    title: 'Tablets',
    breadcrumb: 'Tablets',
    emptyText: 'There are no tablets yet',
  },
  accessories: {
    title: 'Accessories',
    breadcrumb: 'Accessories',
    emptyText: 'There are no accessories yet',
  },
};
