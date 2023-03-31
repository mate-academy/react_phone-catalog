import { Gadget } from '../types/Gadjets';
import { Product, ProductDetails } from '../types/Product';

export const getProducts = async (): Promise<Product[]> => {
  try {
    /* eslint-disable-next-line */
    const productsFromAPI = await fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json');

    if (productsFromAPI.ok) {
      return await productsFromAPI.json();
    }

    throw new Error('error');
  } catch {
    throw new Error('error');
  }
};

export const getPhones = async (): Promise<Product[]> => {
  try {
    const result = await getProducts();

    return result.filter(product => product.type === Gadget.Phone);
  } catch {
    throw new Error('error');
  }
};

export const getTablets = async (): Promise<Product[]> => {
  try {
    const result = await getProducts();

    return result.filter(product => product.type === Gadget.Tablet);
  } catch {
    throw new Error('error');
  }
};

export const getAccessories = async (): Promise<Product[]> => {
  try {
    const result = await getProducts();

    return result.filter(product => product.type === Gadget.Accessory);
  } catch {
    throw new Error('error');
  }
};

export const getHotPriceProducts = async (): Promise<Product[]> => {
  try {
    const products = await getProducts();

    return products
      .filter(({ discount }) => !!discount)
      .sort((prodPrev, prodCurr) => prodCurr.discount - prodPrev.discount);
  } catch {
    throw new Error('error');
  }
};

export const getProductDetails = async (
  id: string | undefined,
): Promise<ProductDetails> => {
  try {
    /* eslint-disable-next-line */
    const productsFromAPI = await fetch(`https://mate-academy.github.io/react_phone-catalog/api/products/${id}.json`);

    if (productsFromAPI.ok) {
      return await productsFromAPI.json();
    }

    throw new Error('error');
  } catch {
    throw new Error('error');
  }
};

export const getProductById = async (
  id: string | undefined,
): Promise<Product | null> => {
  try {
    const result = await getProducts();

    return result.find(item => item.id === id) || null;
  } catch {
    throw new Error('error');
  }
};

export const getSuggestedProducts = async (): Promise<Product[]> => {
  try {
    const result = await getProducts();
    const randomProduct: Product[] = [];
    const getRandomDigit = () => (
      Math.floor(Math.random() * result.length)
    );

    do {
      if (!randomProduct.length) {
        randomProduct.push(result[getRandomDigit()]);
      }

      const productToAdd = result[getRandomDigit()];
      const isIncludes = randomProduct.some(item => (
        item.id === productToAdd.id
      ));

      if (!isIncludes) {
        randomProduct.push(productToAdd);
      }
    } while (randomProduct.length < result.length / 2);

    return randomProduct;
  } catch {
    throw new Error('error');
  }
};
