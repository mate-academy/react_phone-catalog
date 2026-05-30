import { Accessories } from './Accessories';
import { Phone } from './Phone';
import { Product } from './Product';
import { CardItem } from './СardItem';

const RAW_BASE = import.meta.env.BASE_URL;
const BASE = RAW_BASE.endsWith('/') ? RAW_BASE : `${RAW_BASE}/`;

const buildImgUrl = (path: string) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return BASE + cleanPath;
};

export const fromPhone = (p: Phone): CardItem => ({
  id: String(p.id),
  name: p.name,
  img: p.images?.[0] ? buildImgUrl(p.images[0]) : '',
  price: p.priceDiscount ?? p.priceRegular,
  screen: p.screen,
  capacity: p.capacity,
  ram: p.ram,
  link: `/${p.category}/${p.namespaceId}`,
});

export const fromProduct = (p: Product): CardItem => ({
  id: String(p.itemId),
  name: p.name,
  img: buildImgUrl(p.image),
  price: p.price,
  oldPrice: p.fullPrice,
  screen: p.screen,
  capacity: p.capacity,
  ram: p.ram,
  link: `/products/${p.itemId}`,
});

export const fromAccessories = (acc: Accessories): CardItem => ({
  id: String(acc.id),
  name: acc.name,
  oldPrice: acc.priceRegular,
  price: acc.priceDiscount,
  screen: acc.screen,
  capacity: acc.capacity,
  ram: acc.ram,
  img: acc.images?.[0] ? buildImgUrl(acc.images[0]) : '',
  link: `/${acc.category}/${acc.namespaceId}`,
});
