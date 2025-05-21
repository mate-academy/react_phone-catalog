/* eslint-disable prettier/prettier */
import { Accessorie } from '../types/accessorie';
import { Phone } from '../types/phone';
import { Product } from '../types/product';
import { Tablet } from '../types/tablet';

const BASE_URL =
  // eslint-disable-next-line max-len
  'https://raw.githubusercontent.com/ykrapivka/react_phone-catalog/master/public/api/';

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products.json`);

  return response.json();
}

export async function getPhones(): Promise<Phone[]> {
  const response = await fetch(`${BASE_URL}/phones.json`);

  return response.json();
}

export async function getTablets(): Promise<Tablet[]> {
  const response = await fetch(`${BASE_URL}/tablets.json`);

  return response.json();
}

export async function getAccessories(): Promise<Accessorie[]> {
  const response = await fetch(`${BASE_URL}/accessories.json`);

  return response.json();
}

export enum Type {
  PHONES = 'phones',
  TABLETS = 'tablets',
  ACCESSORIES = 'accessories',
}

export async function loadProductsType(type: string): Promise<
Accessorie[] | Tablet[] | Phone[]
> {
  switch(type) {
    case (Type.PHONES):
      return getPhones();
    case (Type.TABLETS):
      return getTablets();
    case (Type.ACCESSORIES):
      return getAccessories();
    default:
      return [];
  }
}



