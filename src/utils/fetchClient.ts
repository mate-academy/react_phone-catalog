import { Product } from '../types/Product';
import { ProductDetail } from '../types/ProductDetail';
import { ProductCategories } from '../types/ProductCategories';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || '';
const API_PRODUCT_LIST = process.env.REACT_APP_PRODUCTS || '';
const API_PRODUCT_INFO = `${process.env.REACT_APP_BASE_URL}/products`;

export function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function getFromServer<T>(url: string): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

function getAllProducts<T>(): Promise<T> {
  return fetch(API_PRODUCT_LIST).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

function makePathForImages<T extends { image?: string }>(data: T[]) {
  const dataProducts = [...data].map(product => {
    return {
      ...product,
      image: `${REACT_APP_BASE_URL}/${product.image}`,
    };
  });

  return dataProducts;
}

export async function getProducts() {
  try {
    const products = await getAllProducts<Product[]>();

    return [...products];
  } catch {
    throw new Error();
  }
}

export async function getBrandNewProducts() {
  try {
    const products = await getAllProducts<Product[]>();
    const productsWithImagePath = makePathForImages(products);
    const latestYear = Math.max(...products.map(product => product.year));

    return productsWithImagePath.filter(product => product.year === latestYear);
  } catch {
    throw new Error();
  }
}

export async function getHotPriceProducts() {
  try {
    const products = await getAllProducts<Product[]>();
    const productsWithImagePath = makePathForImages(products);

    return productsWithImagePath.sort((product1, product2) => {
      return (
        product2.fullPrice -
        product2.price -
        (product1.fullPrice - product1.price)
      );
    });
  } catch {
    throw new Error();
  }
}

export async function getProductsByCategory(type: ProductCategories) {
  try {
    const products = await getAllProducts<Product[]>();
    const productsWithImagePath = makePathForImages(products);

    return productsWithImagePath.filter(product => {
      if (type === ProductCategories.all) {
        return product;
      }

      return product.category === type;
    });
  } catch {
    throw new Error();
  }
}

export async function getProductById(id: string) {
  try {
    const product = await getFromServer<ProductDetail>(
      `${API_PRODUCT_INFO}/${id}.json`,
    );

    return product;
  } catch (e) {
    throw new Error();
  }
}
