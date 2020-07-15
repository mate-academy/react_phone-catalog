const PRODUCTS_LIST_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';
const PRODUCT_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products';

const getData = <T>(url: string): Promise<T> => {
  return fetch(url)
    .then(response => response.json());
};

export const getProductsList = async (): Promise<ProductInfo[]> => {
  const productsFromServer = await getData<ProductInfo[]>(PRODUCTS_LIST_URL);

  return productsFromServer;
};

export const getProductDetail = async (productId: string): Promise<ProductDetails> => {
  const productDetails = await getData<ProductDetails>(PRODUCT_URL + '/' + productId + '.json');

  return productDetails;
};

export const getProductsWithDiscount = (products: ProductInfo[]) => (
  products.filter(product => product.discount > 0)
    .map(product => ({
      ...product,
      newPrice: product.price - (product.price / 100 * product.discount),
    }))
    .sort((prev, curr) => (
      (curr.price * curr.discount - prev.price * prev.discount) / 100
    ))
);
