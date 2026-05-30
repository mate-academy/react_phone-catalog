import { Product } from './Product';

export type ProductWithQuantity = Product & { quantity: number };
