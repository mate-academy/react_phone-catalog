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

    window.console.dir(itemsPerPage);

    if (itemsPerPage !== 'All') {
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      filteredProducts = filteredProducts.slice(startIndex, endIndex);
    }

    return filteredProducts;
  });
};
