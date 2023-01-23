import { Tablet } from '../types/Tablet';

export const getNewApi = (oldApi: Tablet) => {
  const {
    age,
    type,
    id,
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = oldApi;

  const newApi = {
    id,
    category: type,
    phoneId: id,
    itemId: id,
    name,
    fullPrice: (Math.ceil(price * ((100 + discount) / 100))) || 0,
    price,
    screen,
    capacity,
    color: 'black',
    ram,
    year: age,
    image: imageUrl,
  };

  return newApi;
};
