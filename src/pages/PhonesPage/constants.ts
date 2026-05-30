type TFunction = (key: string) => string;

export const getSortOptions = (t: TFunction) => [
  { value: 'age', label: t('catalog.sort.age') },
  { value: 'name', label: t('catalog.sort.name') },
  { value: 'price', label: t('catalog.sort.price') },
];

export const getPerPageOptions = (t: TFunction) => [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: t('catalog.perPageAll') },
];
