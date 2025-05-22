import { CartItem } from '../types/CartItem';
import { CartItemDetails } from '../types/CartItemDetails';
import { Product } from '../types/Product';

export const mapCartToProducts = (
  cartItems: CartItem[],
  productsSource: Product[],
) =>
  cartItems
    .map(item => {
      const product = productsSource.find(p => p.itemId === item.id);

      if (!product) {
        return null;
      }

      const quantity = item.quantity;

      return {
        ...product,
        quantity,
        totalPrice: product.price * quantity,
      };
    })
    .filter((product): product is CartItemDetails => product !== null);
