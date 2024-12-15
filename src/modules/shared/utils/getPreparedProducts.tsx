// import { useTranslation } from 'react-i18next';
import { ProductType } from '../types/Product';

export const getPreparedProducts = (
  products: ProductType[],
  filter: string,
  sortBy: string,
) => {
  const copy = products.filter(el => el.category === filter);
  // const { t } = useTranslation();

  switch (sortBy) {
    case 'Newest':
    case 'Найновіші':
      return copy.sort((el1, el2) => el2.year - el1.year);
    case 'Alphabetically':
    case 'За алфавітом':
      return copy.sort((el1, el2) => el1.name.localeCompare(el2.name));
    case 'Cheapest':
    case 'Дешевизною':
      return copy.sort((el1, el2) => el1.price - el2.price);
  }

  return copy;
};
