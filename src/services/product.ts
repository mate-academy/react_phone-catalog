import { ProductCategory } from '../types/ProductCategory';
import { RoutePath } from '../types/RoutePath';

export const getRouteByCategory = (category: string) => {
  if (category === ProductCategory.phones) {
    return RoutePath.Phones;
  }

  if (category === ProductCategory.tablets) {
    return RoutePath.Tablets;
  }

  if (category === ProductCategory.accessories) {
    return RoutePath.Accessories;
  }

  return '/not-found';
};

export function getProductNameSpace(itemId: string) {
  return itemId.split('-').slice(0, -2).join('-');
}

export function getGoodSourceByRoute(pathname: string) {
  if (pathname.startsWith('/phones')) {
    return '/phones.json';
  }

  if (pathname.startsWith('/tablets')) {
    return '/tablets.json';
  }

  return '/accessories.json';
}
