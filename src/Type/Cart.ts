// import { Phone } from "./Phone";
import { Product } from './Product';

export interface Cart {
  id: number,
  quantity: number,
  product: Product,
}
