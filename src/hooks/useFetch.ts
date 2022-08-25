// eslint-disable-next-line max-len
const API = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export const useFetch = () => {
  const getFetch = async () => {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error(`${res.status}:\n ${res.statusText} `);
    }

    const response = await res.json();

    return response;
  };

  return { getFetch };
};
