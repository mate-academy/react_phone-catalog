import { BECartItem, ProcessingResult, ValidCartBody } from '../types';
import { formProduct } from './helpers';

export const getTotalPrice = (
  body: ValidCartBody,
): ProcessingResult<{ products: BECartItem[]; total: number }> => {
  const cart = body.cartItems.map(el => formProduct(el));

  const total = cart.reduce((acc, item) => acc + item.total, 0);

  return { ok: true, data: { products: cart, total: total } };
};
