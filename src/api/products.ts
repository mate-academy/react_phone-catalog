import { Product } from 'src/types/Product';
import { get } from './httpClient';
import { ProductDetails } from 'src/types/ProductDetails';

export const getProducts = (): Promise<Product[]> => get('/products.json');

const CATEGORY_FILES = ['/phones.json', '/tablets.json', '/accessories.json'];

export const getAllProductsDetails = (): Promise<ProductDetails[]> =>
  Promise.all(CATEGORY_FILES.map(file => get<ProductDetails[]>(file))).then(
    results => results.flat(),
  );

export const getProductDetails = (productId: string): Promise<ProductDetails> =>
  Promise.all(CATEGORY_FILES.map(file => get<ProductDetails[]>(file))).then(
    results => {
      const allProducts = results.flat();
      const product = allProducts.find(p => p.id === productId);

      if (!product) {
        throw new Error('Product was not found');
      }

      return product;
    },
  );

export const getProductVariant = (
  namespaceId: string,
): Promise<ProductDetails[]> =>
  getAllProductsDetails().then(products =>
    products.filter(product => product.namespaceId === namespaceId),
  );

export const getSuggestedProducts = (category: string): Promise<Product[]> =>
  getProducts().then(products => {
    const filtered = products.filter(p => p.category === category);

    return [...filtered].sort(() => Math.random() - 0.5).slice(0, 10);
  });

export const getProductByItemId = (itemId: string): Promise<Product> =>
  getProducts().then(products => {
    const product = products.find(p => p.itemId === itemId);

    if (!product) {
      throw new Error('Product was not found');
    }

    return product;
  });
