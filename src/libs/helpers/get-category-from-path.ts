import { PATH_SEPARATOR, ProductsCategories } from '../enums';

type FunctionType = (pathname: string) => ProductsCategories;

export const getCategoryFromPath: FunctionType = (pathname) => {
  const key = pathname
    .replaceAll(PATH_SEPARATOR, '')
    .toUpperCase() as keyof typeof ProductsCategories;

  return ProductsCategories[key];
};
