import { Category } from '@shared/types';
import { TranslationKey } from '@shared/i18n';

export type SortBy = 'age' | 'title' | 'price';

export const SORT_OPTIONS: { value: SortBy; labelKey: TranslationKey }[] = [
  { value: 'age', labelKey: 'products.sort.age' },
  { value: 'title', labelKey: 'products.sort.title' },
  { value: 'price', labelKey: 'products.sort.price' },
];

export const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

export const DEFAULT_SORT: SortBy = 'age';
export const DEFAULT_PER_PAGE = 'all';

interface CategoryInfo {
  titleKey: TranslationKey;
  breadcrumbKey: TranslationKey;
  emptyKey: TranslationKey;
  noMatchKey: TranslationKey;
}

// The README asks for a `<category> page` heading, which wins over the
// shorter title used in the Figma frame.
export const CATEGORY_INFO: Record<Category, CategoryInfo> = {
  phones: {
    titleKey: 'products.title.phones',
    breadcrumbKey: 'nav.phones',
    emptyKey: 'products.empty.phones',
    noMatchKey: 'products.noMatch.phones',
  },
  tablets: {
    titleKey: 'products.title.tablets',
    breadcrumbKey: 'nav.tablets',
    emptyKey: 'products.empty.tablets',
    noMatchKey: 'products.noMatch.tablets',
  },
  accessories: {
    titleKey: 'products.title.accessories',
    breadcrumbKey: 'nav.accessories',
    emptyKey: 'products.empty.accessories',
    noMatchKey: 'products.noMatch.accessories',
  },
};
