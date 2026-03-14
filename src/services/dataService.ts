import { Product, Products } from '../types/Product';
import { getData } from '../utils/httpClient';

const BASE_URL = 'https://roma-ivashchenko.github.io/react_phone-catalog/api';
export const getProducts = () => getData<Products[]>(BASE_URL + '/products.json');

export const getProductByCategory = (category: string) =>
  getData<Products[]>(BASE_URL + '/products.json').then((products) =>
    products.filter((product) => product.category === category),
  );

export const getProductById = (productId: string) => {
  return getData<Products[]>(BASE_URL + '/products.json')
    .then((products) => {
      const foundProduct = products.find((product) => product.itemId === productId);

      if (!foundProduct) {
        throw new Error();
      }

      return foundProduct;
    })
    .then((foundProduct) =>
      getData<Product[]>(`${BASE_URL}/${foundProduct.category}.json`).then((products) =>
        products.find((product) => product.id === productId),
      ),
    );
};

export const getSuggestedProducts = (category?: string) =>
  getData<Products[]>(BASE_URL + '/products.json').then((products) => {
    const filtered = category ? products.filter((p) => p.category === category) : products;

    return [...filtered].sort(() => Math.random() - 0.5).slice(0, 10);
  });

export const getNewProducts = () =>
  getData<Products[]>(BASE_URL + '/products.json').then((products) => {
    const seenModels = new Set();

    return [...products]
      .sort((a, b) => b.year - a.year)
      .filter((product) => {
        const modelId = product.itemId.split('-').slice(0, -2).join('-'); // відрізаємо пам'ять і колір

        if (seenModels.has(modelId)) {
          return false; // Якщо таку модель вже бачили пропускаємо
        }

        seenModels.add(modelId);
        return true;
      })
      .slice(0, 12);
  });

export const getHotPrices = () =>
  getData<Products[]>(BASE_URL + '/products.json').then((products) => {
    const seenModels = new Set();

    return [...products]
      .filter((p) => p.fullPrice > p.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .filter((product) => {
        const modelId = product.itemId.split('-').slice(0, -2).join('-');

        if (seenModels.has(modelId)) {
          return false;
        }

        seenModels.add(modelId);
        return true;
      })
      .slice(0, 12);
  });
