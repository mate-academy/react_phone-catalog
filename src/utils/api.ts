export const getPhones = () => {
  return fetch('/api/phones.json').then(response => response.json());
};

export const getTablets = () => {
  return fetch('/api/tablets.json').then(response => response.json());
};

export const getAccessories = () => {
  return fetch('/api/accessories.json').then(response => response.json());
};

export const getNewModels = () => {
  return fetch('/api/phones.json')
    .then(response => response.json())
    .then(data =>
      data
        .filter(
          (item: { capacity: string; name: string }) =>
            item.capacity === '1TB' ||
            (item.name.includes('14') && item.name.includes('128')),
        )
        .sort(
          (a: { priceRegular: number }, b: { priceRegular: number }) =>
            b.priceRegular - a.priceRegular,
        ),
    );
};

export const getHotModels = () => {
  return fetch('/api/phones.json')
    .then(response => response.json())
    .then(data =>
      data
        .filter(
          (item: { priceRegular: number; priceDiscount: number }) =>
            item.priceRegular - item.priceDiscount > 90,
        )
        .sort(
          (a: { priceDiscount: number }, b: { priceDiscount: number }) =>
            b.priceDiscount - a.priceDiscount,
        ),
    );
};
