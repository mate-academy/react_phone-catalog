import { Phone } from './phone';

export type CartItem = {
  id: string,
  quantity: number,
  product: Phone,
  discount: boolean,
};
