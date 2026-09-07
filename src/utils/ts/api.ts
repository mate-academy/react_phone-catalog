import { CategoriesType } from '../../types/CategoriesType';
import { ProductType } from '../../types/ProductType';
import { baseUrl } from './baseURL';

export const getBannerSlides = () => {
  return fetch(`${baseUrl}/api/banner.json`).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
};

export const getProductsForHomePage = () => {
  return fetch(`${baseUrl}/api/products.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then((products: ProductType[]) => {
      const newModelsFromServer = products
        .sort((a, b) => b.year - a.year)
        .filter(product => product.capacity === '128GB')
        .slice(0, 10);

      const hotPricesFromServer = products
        .sort((a, b) => b.year - a.year)
        .filter(product => product.capacity === '128GB')
        .slice(0, 10);

      return { newModelsFromServer, hotPricesFromServer };
    });
};

export const getProducts = (category: CategoriesType) => {
  return fetch(`${baseUrl}/api/products.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then(products => {
      if (category) {
        return products.filter(
          (product: { category: string }) => product.category === category,
        );
      }

      return products;
    });
};

export const findProduct = (productId: string) => {
  return fetch(`${baseUrl}/api/products.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then((products: ProductType[]) => {
      return products.find(product => {
        return product.itemId === productId;
      });
    });
};

export const getProduct = (category: CategoriesType, productId: string) => {
  return fetch(`${baseUrl}/api/${category}.json`).then(async response => {
    if (!response.ok) {
      throw new Error();
    }

    const phones = await response.json();

    return phones.find((phone: { id: string }) => phone.id === productId);
  });
};

export const getRandomProducts = () => {
  return fetch(`${baseUrl}/api/products.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then((products: ProductType[]) => {
      return products
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
    });
};
