import { Category } from '../types/Category';
import { ProductDetails } from '../types/ProductDetails';
import { getData } from '../utils/httpClient';

export function getPhones() {
  return getData<ProductDetails[]>('/phones.json');
}

export function getTablets() {
  return getData<ProductDetails[]>('/tablets.json');
}

export function getAccessories() {
  return getData<ProductDetails[]>('/accessories.json');
}

export function getItemByCategory(category: Category) {
  return getData<ProductDetails[]>(`/${category}.json`);
}
