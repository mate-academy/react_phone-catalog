const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

export const $api = <T>(url: string): Promise<T> => {
  return fetch(`${API_URL}/${url}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }

      return res.json();
    });
};
