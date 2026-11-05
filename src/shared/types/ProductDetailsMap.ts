import type { Category } from './Category';
import type { Phone } from './Phone';
import type { Tablet } from './Tablet';
import type { Accessory } from './Accessory';

export type ProductDetailsMap = {
  phones: Phone;
  tablets: Tablet;
  accessories: Accessory;
};

export type ProductDetailsByCategory<T extends Category> = ProductDetailsMap[T];

export type AnyProductDetails = ProductDetailsMap[Category];
