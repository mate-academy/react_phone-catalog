import productList from '../../public/api/products.json';

import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';

export interface Product {
  id: number;
  itemId: string;
  image: string;
  fullPrice: number;
  name: string;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
  favourite?: boolean;
}

export interface SliderCardsProps {
  title: string;
  products: Product[];
  discountPrice?: boolean;
}

type ProductDescription = {
  title: string;
  text: string[];
};

export interface ItemCard {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: ProductDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
  favourite?: boolean; //(! cheack!)
}

export const newPhones = productList.filter(
  product => product.category === 'phones' && product.year >= 2022,
);

export const phonesWithDiscount = productList
  .filter(product => product.category === 'phones' && product.year < 2022)
  .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

export const phonesCatalog = productList
  .filter(product => product.category === 'phones')
  .sort((a, b) => b.year - a.year);
export const tabletsCatalog = productList.filter(
  product => product.category === 'tablets',
);
export const accessoriesCatalog = productList.filter(
  product => product.category === 'accessories',
);

export { phones, tablets, accessories };
