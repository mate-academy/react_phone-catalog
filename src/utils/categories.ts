export interface Category {
  path: string;
  title: string;
  label: string;
  apiEndpoint: string;
}

export const CATEGORIES: Category[] = [
  {
    path: 'phones',
    title: 'phones',
    label: 'Mobile Phones',
    apiEndpoint: 'phones',
  },
  {
    path: 'tablets',
    title: 'tablets',
    label: 'Tablets',
    apiEndpoint: 'tablets',
  },
  {
    path: 'accessories',
    title: 'accessories',
    label: 'Accessories',
    apiEndpoint: 'accessories',
  },
];

export const getCategoryByPath = (path: string) => {
  return CATEGORIES.find(cat => cat.path === path) || null;
};
