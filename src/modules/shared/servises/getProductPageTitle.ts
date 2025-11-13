import { CategoryItem } from '../../../i18next/types/CategoryItem';

export const getProductPageTitle = (
  category: string,
  source: CategoryItem[],
) => {
  return source.filter(title => title.category === category)[0].title;
};
