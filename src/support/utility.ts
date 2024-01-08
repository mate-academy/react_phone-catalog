import { Gadget } from './types';

export const storage = {
  sep: '|||$|||',

  toggle: (key: string, data: string) => {
    if (key === 'favourites' || key === 'cart') {
      const allItems = storage.getAll(key);
      const isExist = allItems.find((el) => el === data);

      if (isExist) {
        const res = allItems.filter((el) => el !== isExist);

        localStorage.setItem(key, res.join(storage.sep));
      } else {
        allItems.push(data);

        localStorage.setItem(key, allItems.join(storage.sep));
      }
    }
  },

  isExist: (key: string, itemID: string) => {
    return !!storage.getAll(key).find((el) => el === itemID);
  },

  getAll: (key: string): string[] => {
    const res = localStorage.getItem(key)?.split(storage.sep);

    if (!res) {
      return [];
    }

    return res;
  },
};

export const sortGadgets = (
  gadgetType: string,
  sortType: string,
  list: Gadget[],
) => {
  const phones = list.filter((el) => el.type === gadgetType);

  const realPrice = (a: Gadget, b: Gadget) => {
    const priceA = a.price - (a.price / 100) * a.discount;
    const priceB = b.price - (b.price / 100) * b.discount;

    return priceA - priceB;
  };

  switch (sortType) {
    case 'newest':
      return phones.sort((a, b) => a.age - b.age);

    case 'cheapest':
      return phones.sort((a, b) => realPrice(a, b));

    default:
      return phones.sort((a, b) => a.name.localeCompare(b.name));
  }
};
