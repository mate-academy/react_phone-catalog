import { ProcessingResult, ValidCheckoutBody } from '../types';
import { formProduct } from './helpers';

type Crypto = `${string}-${string}-${string}-${string}-${string}`;

export const proceedCheckout = (
  body: ValidCheckoutBody,
): ProcessingResult<Crypto> => {
  const cart = body.cartItems.map(el => formProduct(el));

  const total = cart.reduce((acc, item) => acc + item.total, 0);

  const { userDetails, deliveryDetails } = body;

  const orderId = crypto.randomUUID();

  // eslint-disable-next-line no-console
  console.warn('Order accepted', {
    userDetails,
    deliveryDetails,
    total,
    orderId,
  });

  return { ok: true, data: orderId };
};
