import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`./api/products.json`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching products: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching products');
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching product details: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while fetching product details',
      );
    }
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

export const getPreparedProducts = (products: Product[], params: unknown) => {
  const preparedProducts = [...products];

  if (params && typeof params === 'object' && 'query' in params) {
    return preparedProducts.filter(prod => {
      return includesQuery(prod.name, (params as { query: string }).query);
    });
  }

  if (params && typeof params === 'object' && 'sort' in params) {
    return preparedProducts.sort((a, b) => {
      switch ((params as { sort: string }).sort) {
        case 'age':
          return (b.year ?? 0) - (a.year ?? 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }

  return preparedProducts.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
};
