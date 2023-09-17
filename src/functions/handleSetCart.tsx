import { Cart } from '../types/Cart';
import { Product } from '../types/product';

export const handleSetCart = (
  newValue: Product, cart: Cart[], setCart: (v: Cart[]) => void,
) => {
  const existingCartItem = cart.find((item) => item.product.id === newValue.id);

  if (existingCartItem) {
    const updatedCart = cart.filter((item) => item.product.id !== newValue.id);

    setCart(updatedCart);
  } else {
    setCart([
      ...cart,
      {
        product: newValue,
        id: newValue.id,
        quantity: 1,
      },
    ]);
  }
};
