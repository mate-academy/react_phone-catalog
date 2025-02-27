const BASE_URL = 'https://irynazahorodnia.github.io/react_phone-catalog/';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getData<T>(url: string): Promise<T> {
  return wait(500)
    .then(() => fetch(BASE_URL + url + '.json'))
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    });
}
