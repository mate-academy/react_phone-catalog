import { DeliveryTypes } from '@server/static';
import {
  BECartItem,
  ServiceResult,
  Status,
  ValidCheckoutBody,
} from '../../types';
import { createError } from '@server/helpers';

const DELAY = 800;

type Crypto = `${string}-${string}-${string}-${string}-${string}`;

export const getCheckout = async (
  body: ValidCheckoutBody,
): Promise<ServiceResult<Crypto>> => {
  const raw = sessionStorage.getItem('cart');

  if (!raw) {
    return createError(418, 'Cart is empty');
  }

  const cart = JSON.parse(raw) as BECartItem[];
  const total = cart.reduce(
    (acc, item) =>
      acc +
      (item.product.priceDiscount ?? item.product.priceRegular) * item.amount,
    0,
  );

  const { userDetails, deliveryDetails, dataProcessingAgreement } = body;

  if (!dataProcessingAgreement) {
    return createError(422, `Expected data processing agreement`);
  }

  const deliveryWarning =
    deliveryDetails.type !== DeliveryTypes.PICKUP
      ? 'Delivery fee is not included in total price'
      : '';
  const orderId = crypto.randomUUID();

  // eslint-disable-next-line no-console
  console.warn('Order accepted', {
    userDetails,
    deliveryDetails,
    total,
    deliveryWarning,
    orderId,
  });

  await new Promise(resolve => setTimeout(resolve, DELAY));

  return { status: Status.SUCCESS, data: orderId };
};
