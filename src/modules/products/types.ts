import { ProductListParams } from '@/modules/products/schema';

import { PRODUCT_CATEGORIES, PRODUCT_SORT_OPTIONS } from './constants';

export type ProductSort = (typeof PRODUCT_SORT_OPTIONS)[number];

export type ProductSortKey = ProductSort['key'];

export interface BreadcrumbsItem {
  name: string;
  to?: string;
}

export type ProductCategory =
  (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];

export type ProductQueryParams = ProductListParams & {
  category?: ProductCategory;
  ids?: string[];
};
