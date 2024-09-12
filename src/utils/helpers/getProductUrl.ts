import { ROUTES } from '@utils/constants/routes';

export const getProductUrl = (category: string, itemId: string) => {
  return category && itemId ? `/${category}/${itemId}` : ROUTES.NOTFOUND;
};
