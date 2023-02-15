const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request<T>(productId: string): Promise<T> {
  return wait(300)
    .then(() => fetch(
      !productId
        ? BASE_URL
        : `${BASE_URL.slice(0, -5)}/${productId}.json`,
    ))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(productId: string) => request<T>(productId),
};
