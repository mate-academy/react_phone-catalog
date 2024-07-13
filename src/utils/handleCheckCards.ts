import { CartType } from "../types/ContextType/CartType";
import { Product } from "../types/ContextType/Product";

export const handleCheckCarts = (currentProduct: Product, cartItems: CartType[]) => {
  const findCart = cartItems.find(item => item.id === currentProduct.id);

  return !!findCart;
};
