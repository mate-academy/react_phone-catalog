import { ProductType } from '../types/product';

export function getPageTitle(productType: ProductType) {
  switch (productType) {
    case ProductType.PHONE:
      return 'Mobile phones';
    case ProductType.TABLET:
      return 'Tablets';
    case ProductType.ACCESSORY:
      return 'Accessories';
    default: return '';
  }
}

export function getQuantity(productType: ProductType) {
  return getPageTitle(productType).toLowerCase();
}
