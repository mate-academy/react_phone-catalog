import { MenuItems } from '../types/MenuItems';
import { Product } from '../types/Product';
import { client } from './fetch';

export const getProducts = {
  fetchProducts(): Promise<Product[]> {
    return client.get<Product[]>('products.json');
  },

  getDiscount(item: Product) {
    return item.fullPrice - item.price;
  },

  getHotDealsProducts(products: Product[]) {
    const sorted = products.sort((a, b) => {
      return this.getDiscount(b) - this.getDiscount(a);
    });

    return sorted;
  },

  getNewProducts(products: Product[]) {
    const maxYear: number = products
      .map(prod => prod.year)
      .reduce((prev, cur) => (cur > prev ? cur : prev), 0);

    return products.filter(product => product.year >= maxYear);
  },

  getProductById(products: Product[], itemId: string) {
    if (products) {
      return products.find(product => product.itemId === itemId);
    }

    return;
  },

  getProductByCategory(
    products: Product[],
    category: MenuItems,
  ): Product[] | undefined {
    if (products) {
      return products.filter(product => product.category === category);
    }

    return;
  },
};
