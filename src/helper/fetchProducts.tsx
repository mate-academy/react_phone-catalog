import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

// const BASE_URL = 'http://localhost:3000/api';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`./api/products.json`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};

export const getProductDetails = async (
  productId: string,
  productCategory: string,
): Promise<ProductDetails | null> => {
  try {
    const response = await fetch(`./api/${productCategory}.json`, {
      method: 'GET',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }

      throw new Error(`${response.status} ${response.statusText}`);
    }

    const productDetails = await response.json();
    const product = productDetails.find(
      (prod: ProductDetails) => prod.id === productId,
    );

    return product || null;
  } catch (error: any) {
    throw new Error(`Error fetching product details: ${error.message}`);
  }
};

export const getPhones = () => {
  return fetchProducts().then(products =>
    products.filter(product => product.category === 'phones'),
  );
};

export const getTablets = () => {
  return fetchProducts().then(products =>
    products.filter(product => product.category === 'tablets'),
  );
};

export const getAccessories = () => {
  return fetchProducts().then(products =>
    products.filter(product => product.category === 'accessories'),
  );
};

const shuffleArray = (array: Product[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export const getSuggestedProducts = (count: number) => {
  return fetchProducts().then(products => {
    const shuffledProducts = shuffleArray(products);

    return shuffledProducts.slice(0, count);
  });
};

export const includesQuery = (phoneName: string | null, input: string) => {
  return phoneName?.trim().toLowerCase().includes(input.trim().toLowerCase());
};

export const getPreparedProducts = (products: Product[], params: any) => {
  const preparedProducts = [...products];

  if (params.query) {
    return preparedProducts.filter(prod => {
      return includesQuery(prod.name, params.query);
    });
  }

  if (params.sort) {
    return preparedProducts.sort((a, b) => {
      switch (params.sort) {
        case 'age':
          return (a.year ?? 0) - (b.year ?? 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }

  return preparedProducts;
};
