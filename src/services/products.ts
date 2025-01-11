import {
  Accessories,
  Phone,
  Product,
  ProductsWithDetails,
  Tablets,
} from '../modules/shared/types/products';
import { getData } from '../utils/httpClient';

export async function getProductsWithDetails() {
  const products = await getData<Product[]>('/products.json');
  const phones = await getData<Phone[]>('/phones.json');
  const accessories = await getData<Accessories[]>('/accessories.json');
  const tablets = await getData<Tablets[]>('/tablets.json');

  return products.map((product: Product): ProductsWithDetails => {
    return {
      ...product,
      details:
        phones.find(item => product.itemId === item.id) ||
        tablets.find(item => product.itemId === item.id) ||
        accessories.find(item => product.itemId === item.id) ||
        null,
    };
  });
}
