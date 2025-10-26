import { fetchClient } from '../utils/fetchClient';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { SortBy } from '../constants/sortOptions';

export const getProducts = () => {
  return fetchClient.get<Product[]>('/products.json');
};

export const getNewestProducts = (limit = 4) => {
  return fetchClient
    .get<Product[]>('/products.json')
    .then(products => products.sort((a, b) => b.year - a.year).slice(0, limit));
};

export const getDiscountedProducts = (limit = 4) => {
  return fetchClient.get<Product[]>('/products.json').then(products =>
    products
      .filter(product => product.fullPrice > product.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, limit),
  );
};

export const getProductsByCategoryWithPagination = (
  category: string,
  page = 1,
  perPage = 16,
  sortBy: SortBy = SortBy.Newest,
) => {
  return fetchClient.get<Product[]>('/products.json').then(products => {
    let filtered = products.filter(product => product.category === category);
    let sorted = [...filtered];

    switch (sortBy) {
      case SortBy.Newest:
        sorted.sort((a, b) => b.year - a.year);
        break;
      case SortBy.Alphabetically:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortBy.Cheapest:
        sorted.sort((a, b) => a.price - b.price);
        break;
    }

    const start = (page - 1) * perPage;
    const end = start + perPage;

    return {
      products: sorted.slice(start, end),
      total: sorted.length,
      page,
      perPage,
    };
  });
};

export const getProductByIdFromCategory = (
  category: string,
  productId: string,
) => {
  return fetchClient
    .get<ProductDetails[]>(`/${category}.json`)
    .then(products => {
      return products.find(product => product.id === productId);
    });
};

export const getProductById = (
  productId: string,
): Promise<ProductDetails | undefined> => {
  const categories = ['phones', 'tablets', 'accessories'];

  // Try to find product in all categories
  const promises = categories.map(category =>
    fetchClient
      .get<ProductDetails[]>(`/${category}.json`)
      .then(products => products.find(product => product.id === productId))
      .catch(() => undefined),
  );

  return Promise.all(promises).then(results => {
    return results.find(product => product !== undefined);
  });
};

export const getSuggestedProducts = (limit = 10) => {
  return fetchClient.get<Product[]>('/products.json').then(products => {
    // Shuffle array and get random products
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  });
};
