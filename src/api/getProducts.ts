const wait = (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};

export function getProducts<T>(url = './api/products.json'): Promise<T> {
  return wait(500)
    .then(() => fetch(url))
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return response.json();
    });
}
