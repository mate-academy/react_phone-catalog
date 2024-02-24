import { CartObject } from '../../store/models/cart';

export interface CartViewProps {
  cartItems: CartObject[],
  incrementProduct: (id: string) => void,
  decrementQuantity: (id: string) => void,
  removeProduct: (id: string) => void,
  totalCost: number,
  totalItems: number,
}
