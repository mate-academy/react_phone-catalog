import products from '../../../../public/api/products.json'
import phones from '../../../../public/api/phones.json'
import tablets from '../../../../public/api/tablets.json'
import accessories from '../../../../public/api/accessories.json'

export function getProducts() {
  return products;
}

export function getPhones() {
  return phones;
}

export function getTablets() {
  return tablets;
}

export function getAccessories() {
  return accessories;
}

export function findProduct(key: string, value: string | number) {
  return getProducts().find((phone: any) => phone[key] === value);
}

export function findPhone(key: string, value: string | number) {
  return getPhones().find((phone: any) => phone[key] === value);
}

export function findTablet(key: string, value: string | number) {
  return getTablets().find((tablet: any) => tablet[key] === value);
}

export function findAccessory(key: string, value: string | number) {
  return getAccessories().find((accessory: any) => accessory[key] === value);
}