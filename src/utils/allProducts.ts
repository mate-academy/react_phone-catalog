import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';

export const allProducts = [...phones, ...tablets, ...accessories];
