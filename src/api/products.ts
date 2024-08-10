import { getRandomItemsFromArray } from '../helpers/functions';
import { Product, ProductCategory } from '../types/products';
import { client } from '../utils/axiosClient';
import { getAccessories } from './accessories';
import { getPhones } from './phones';
import { getTablets } from './tablets';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getBrandNewModels = () => {
  return getProducts().then(products =>
    products.sort((a, b) => b.fullPrice - a.fullPrice),
  );
};

export const getHotPriceProducts = () => {
  return getProducts().then(products =>
    products.sort((a, b) => b.fullPrice - b.price - a.fullPrice - a.price),
  );
};

export const getAmountOfProducts = async () => {
  const [accessories, phones, tablets] = await Promise.all([
    getAccessories(),
    getPhones(),
    getTablets(),
  ]);

  return {
    accessories: accessories.length,
    phones: phones.length,
    tablets: tablets.length,
  };
};

export const getFilteredProducts = (
  category: ProductCategory,
  sortOrder: string,
  itemsPerPage: number | 'All',
  pageNumber: number,
): Promise<Product[]> => {
  return getProducts().then(products => {
    let filteredProducts = products.filter(
      product => product.category === category,
    );

    filteredProducts = filteredProducts.sort((a, b) => {
      switch (sortOrder) {
        case 'Newest':
          return b.year - a.year;
        case 'Alphabetically':
          return a.name.localeCompare(b.name);
        case 'Cheapest':
          return a.price - b.price;
        default:
          return 0;
      }
    });

    if (itemsPerPage !== 'All') {
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      filteredProducts = filteredProducts.slice(startIndex, endIndex);
    }

    return filteredProducts;
  });
};

export const getProductById = (id: string) => {
  return Promise.any([
    getAccessories().then(
      items => items.find(item => item.id === id) || Promise.reject(null),
    ),
    getPhones().then(
      items => items.find(item => item.id === id) || Promise.reject(null),
    ),
    getTablets().then(
      items => items.find(item => item.id === id) || Promise.reject(null),
    ),
  ]);
};

export const getSmallProductById = (id: string) => {
  return getProducts().then(
    items => items.find(item => item.itemId === id) || Promise.reject(),
  );
};

export const getSuggestedProducts = (amount: number) => {
  return getProducts().then(products =>
    getRandomItemsFromArray(products, amount),
  );
};

export const getProductsById = (id: number[]) => {
  return getProducts().then(products =>
    products.filter(product => id.includes(product.id)),
  );
};
