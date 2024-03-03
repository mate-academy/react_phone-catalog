import { CartObject } from '../../store/models/cart';

export interface CartItemProps {
  cartItem: CartObject,
  onIncrement: (id: string) => void,
  onDecrement: (id: string) => void,
  onRemove: (id: string) => void,
}
