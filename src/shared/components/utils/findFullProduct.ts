import phones from '../../../../public/api/phones.json';
import tablets from '../../../../public/api/tablets.json';
import accessories from '../../../../public/api/accessories.json';

const allProducts = [...phones, ...tablets, ...accessories];

export function findFullProduct(itemId: string) {
  return allProducts.find(p => p.id === itemId);
}
