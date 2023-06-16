import axios from 'axios';

export const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

export const fetcher = (url: string) => axios
  .get(url)
  .then(res => res.data);
