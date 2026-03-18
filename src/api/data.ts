const BASE_URL = 'api';

export const getData = <T>(url: string): Promise<T[]> => {
  return fetch(`${BASE_URL}/${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching data ${response.statusText}`);
      }

      return response.json() as Promise<T[]>;
    })
    .catch(() => {
      throw new Error('Something went wrong. Please try again');
    });
};
