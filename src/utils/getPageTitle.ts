import { ProductType } from '../types/product';

export function getPageTitle(productType: ProductType) {
  switch (productType) {
    case ProductType.PHONES:
      return 'Mobile phones';
    case ProductType.TABLET:
      return 'Tablets';
    case ProductType.ACCESSORY:
      return 'Accessories';
    default: return '';
  }
}

export function getQuantity(productType: ProductType) {
  switch (productType) {
    case ProductType.PHONES:
      return 'phones';
    case ProductType.TABLET:
      return 'tablets';
    case ProductType.ACCESSORY:
      return 'accessories';
    default: return '';
  }
}
