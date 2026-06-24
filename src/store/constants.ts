export const navigation = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/catalog',
    label: 'Catalog',
  },
  {
    href: 'catalog/phones',
    label: 'Phones',
  },
  {
    href: 'catalog/tablets',
    label: 'Tablets',
  },
  {
    href: 'catalog/accessories',
    label: 'Accessories',
  },
];

export const sortByOptions = [
  { label: 'Newest', value: 'year' },
  { label: 'Alphabetically', value: 'alph' },
  { label: 'Price', value: 'price' },
];

export const itemsOnPageOptions = [
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '16', value: '16' },
];

export const catalogTitles: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const PaymentMethods = [
  { label: 'Card', value: 'card' },
  { label: 'Cash', value: 'cash' },
];
