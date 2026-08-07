export type Category = 'phones' | 'tablets' | 'accessories';

export const CATEGORY_CONFIG = {
  phones: {
    title: 'categories.mobilePhones',
    breadcrumb: 'nav.phones',
    href: '/phones',
  },
  tablets: {
    title: 'categories.tablets',
    breadcrumb: 'nav.tablets',
    href: '/tablets',
  },
  accessories: {
    title: 'categories.accessories',
    breadcrumb: 'nav.accessories',
    href: '/accessories',
  },
};
