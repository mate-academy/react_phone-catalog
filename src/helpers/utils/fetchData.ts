import { Phone } from '../../Types/Phone';

// eslint-disable-next-line
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then(response => response.json());
}

function getPhones() {
  return getData<Phone[]>('');
}

export const client = {
  fetchPhones: () => getPhones(),
};

export function getHotPriceProducts(phonesWithDiscount: Phone[], type: string) {
  const preparedPhones = [...phonesWithDiscount];

  preparedPhones.filter(phone => phone.category === type);

  preparedPhones.sort((a, b) => {
    return (b.fullPrice - b.price) - (a.fullPrice - a.price);
  });

  return preparedPhones;
}

export function getNewProducts(phones: Phone[], type: string) {
  const preparedPhones = [...phones];

  preparedPhones.filter(phone => phone.category === type);

  preparedPhones.sort((a, b) => {
    return b.year - a.year;
  });

  return preparedPhones;
}
