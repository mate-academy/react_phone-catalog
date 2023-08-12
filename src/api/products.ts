const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

const request = async (url: string) => {
  // function wait(delay: number) {
  //   return new Promise(resolve => {
  //     setTimeout(resolve, delay);
  //   });
  // }

  // await wait(600000);

  const response = await fetch(BASE_URL + url);

  return response.json();
};

export const getProducts = () => request('/products.json');
export const getProductDetails = (productId: string) => {
  return request(`/products/${productId}.json`);
};
