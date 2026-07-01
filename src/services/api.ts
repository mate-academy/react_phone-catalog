// import { apiUrl } from '../utils/api';

export const getPhones = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/phones.json`);

  return res.json();
};

// export const getPhones = async () => {
//   const res = await fetch(apiUrl('api/phones.json'));

//   return res.json();
// };

export const getTablets = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/tablets.json`);

  return res.json();
};

// export const getTablets = async () => {
//   const res = await fetch(apiUrl('api/tablets.json'));

//   return res.json();
// };

// export const getAccessories = async () => {
//   const res = await fetch(apiUrl('api/accessories.json'));

//   return res.json();
// };

export const getAccessories = async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/accessories.json`);

  return res.json();
};
