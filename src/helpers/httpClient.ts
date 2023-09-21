const BASE_URL = 'https://gosyanich.cloudns.nz:9353/kuroso';

export const getData = <T>(url: string): Promise<T> => {
  return fetch(`${BASE_URL}/${url}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Server is currently unavailable');
      }

      return response.json();
    });
};
