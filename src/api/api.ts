import { Category, Product, ProductDetails } from '@/shared/type';

const BASE_URL = './api';

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function getData<T>(url: string): Promise<T> {
  return wait(800)
    .then(() => fetch(BASE_URL + url))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    });
}

function getProductDetails(category: Category, itemId: string) {
  return getData<ProductDetails[]>(`/${category}.json`).then((phones) => {
    const productDetail = phones.find((findPhone) => findPhone.id === itemId);
    if (!productDetail) {
      throw new Error('Product was not found');
    }

    return {
      productDetail,
      productByNamespace: phones.filter(
        (filterPhone) => filterPhone.namespaceId === productDetail?.namespaceId,
      ),
    };
  });
}

function getProducts() {
  return getData<Product[]>('/products.json');
}

export const api = {
  getProductDetails,
  getProducts,
};
