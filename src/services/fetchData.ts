const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

export const fetchData = () => {
  return fetch(`${BASE_URL}/products.json`).then((response) => {
    return response.json();
  });
};
