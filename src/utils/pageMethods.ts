import { Phones } from '../types/Phones';

export const getqueryFavorites = (
  products: Phones[],
  query: string,
) => {
  const search = query.toLowerCase();

  const newArray = products
    .filter((item: Phones) => item.name.toLowerCase().includes(search));

  return newArray;
};

export const getNewColorProduct = (color: string, phonesId: string) => {
  const idArray = phonesId.split('-');

  idArray.pop();
  idArray.push(color);

  const updatedPhonesId = idArray?.join('-');

  return updatedPhonesId;
};
