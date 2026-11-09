import { Product } from '../../../types/Product';

const SLIDER_LIMIT = 20;

const getDiscount = (product: Product) => product.fullPrice - product.price;

export function getBrandNewProducts(products: Product[]) {
  return [...products].sort((a, b) => b.year - a.year).slice(0, SLIDER_LIMIT);
}

export function getHotPriceProducts(products: Product[]) {
  return products
    .filter(product => getDiscount(product) > 0)
    .sort((a, b) => getDiscount(b) - getDiscount(a))
    .slice(0, SLIDER_LIMIT);
}
