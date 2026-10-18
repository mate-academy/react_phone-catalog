import { Category, Product, ProductDetails } from '../types';
import { getJson } from './client';

const SUGGESTED_COUNT = 8;
const CATEGORIES: Category[] = ['phones', 'tablets', 'accessories'];

export const fetchProducts = () => getJson<Product[]>('api/products.json');

export const fetchCategoryProducts = (category: Category) =>
  fetchProducts().then(products =>
    products.filter(product => product.category === category),
  );

export const fetchProductByItemId = (itemId: string) =>
  fetchProducts().then(products =>
    products.find(product => product.itemId === itemId),
  );

const fetchAllDetails = () =>
  Promise.all(
    CATEGORIES.map(category =>
      getJson<ProductDetails[]>(`api/${category}.json`),
    ),
  ).then(detailsByCategory => detailsByCategory.flat());

export const fetchProductDetails = (productId: string) =>
  fetchAllDetails().then(allDetails =>
    allDetails.find(details => details.id === productId),
  );

export const fetchProductVariants = (namespaceId: string) =>
  fetchAllDetails().then(allDetails =>
    allDetails.filter(details => details.namespaceId === namespaceId),
  );

export const getSuggestedProducts = (excludedItemId?: string) =>
  fetchProducts().then(products =>
    products
      .filter(product => product.itemId !== excludedItemId)
      .map(product => ({ product, order: Math.random() }))
      .sort((first, second) => first.order - second.order)
      .slice(0, SUGGESTED_COUNT)
      .map(({ product }) => product),
  );
