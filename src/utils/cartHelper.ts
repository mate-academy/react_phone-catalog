import { CartProduct } from '../types/CartProduct';
import { Product } from '../types/Product';
import { getFinalPrice } from './productsHelper';

export function addToCart(cart: CartProduct[], product: Product) {
  const newId = cart.length ? Math.max(...cart.map(item => item.id)) + 1 : 0;
  const newItem = {
    id: newId,
    quantity: 1,
    product,
  };

  return [...cart, newItem];
}

export function deleteFromCart(cart: CartProduct[], itemId: number) {
  return cart.filter(item => item.id !== itemId);
}

type QuantityOperation = 'minus' | 'plus';

export function changeQuantity(
  cart: CartProduct[],
  itemToUpdate: CartProduct,
  operation: QuantityOperation,
) {
  let updatedQuantity;

  switch (operation) {
    case 'minus':
      updatedQuantity = itemToUpdate.quantity - 1;
      break;

    case 'plus':
      updatedQuantity = itemToUpdate.quantity + 1;
      break;

    default:
      updatedQuantity = 1;
  }

  const updatedItem = {
    ...itemToUpdate,
    quantity: updatedQuantity,
  };
  const updatedCart = [...cart];
  const index = updatedCart.findIndex(item => item.id === itemToUpdate.id);

  updatedCart.splice(index, 1, updatedItem);

  return updatedCart;
}

export function getCartTotal(cart: CartProduct[]) {
  return [...cart].reduce((acc, curr) => {
    const actualPrice = getFinalPrice(
      curr.product.price, curr.product.discount,
    );

    return acc + (actualPrice * curr.quantity);
  }, 0);
}

export function getCartTotalQuantity(cart: CartProduct[]) {
  return [...cart].reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);
}
