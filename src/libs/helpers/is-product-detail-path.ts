import { AppRoutes } from '../enums';

export const isProductDetailPath = (pathname: string) => {
  const PHONE_DETAIL_PATH_PATTERN = new RegExp(`^(${AppRoutes.PHONES}|${AppRoutes.TABLETS}|${AppRoutes.ACCESSORIES})/.+$`);

  return PHONE_DETAIL_PATH_PATTERN.test(pathname);
};
