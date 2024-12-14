import { Product } from './Product.type';

export type CartProduct = Product & { quantity: number };
