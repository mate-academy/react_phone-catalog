import { Phone } from '../types/Phone';

// eslint-disable-next-line max-len
const url = 'https://mate-academy.github.io/react_phone-catalog/_new/products';

export const getProducts = () => {
  return fetch(`${url}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

export const getPhones = () => {
  return getProducts()
    .then(res => res.filter((product: Phone) => product.category === 'phones'));
};

export const getPhone = (id: string) => {
  return fetch(`${url}/${id}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
};

export const getHotPriceProducts = () => {
  return getProducts()
    .then((res: Phone[]) => {
      return [...res]
        .sort((productFirst, productSecond) => {
          const first = productFirst.fullPrice - productFirst.price;
          const second = productSecond.fullPrice - productSecond.price;

          return second - first;
        });
    });
};

export const getBrandNewProducts = () => {
  return getProducts()
    .then((res: Phone[]) => {
      const gettedPhones: Phone[] = [...res]
        .sort((productFirst, productSecond) => {
          return productSecond.year - productFirst.year;
        });

      return gettedPhones
        .filter(product => gettedPhones[0].year === product.year)
        .map(product => ({ ...product, fullPrice: 0 }));
    });
};

export const getSuggestedProducts = () => {
  return getProducts()
    .then((res: Phone[]) => {
      return [...res]
        .sort((productFirst, productSecond) => {
          const first = productFirst.fullPrice - productFirst.price;
          const second = productSecond.fullPrice - productSecond.price;

          return second - first;
        });
    });
};
