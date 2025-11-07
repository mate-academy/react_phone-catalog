import { getCart, getCheckout } from '@server/services';
import { ErrorObject, ValidCheckoutBody } from '../../types';
import {
  basicValidation,
  validateCartItem,
  validateDeliveryDetails,
  validateUserDetails,
} from '../validationHelpers';
import { createError } from '@server/helpers';

const validShapes = {
  checkout: {
    userDetails: 'object',
    deliveryDetails: 'object',
    dataProcessingAgreement: 'boolean',
  },
  cart: {
    id: 'string',
    amount: 'number',
  },
};

const validateCartBody = (arg: unknown) => {
  if (!Array.isArray(arg)) {
    return createError(422, `Invalid field types: ${arg}`);
  }

  const check = arg.map(el => validateCartItem(el));

  if (!check.every(el => el === true)) {
    return check.filter(el => el !== true)[0];
  }

  return getCart(arg);
};

const validateCheckoutBody = (arg: unknown) => {
  const basicValidated = basicValidation(arg, validShapes.checkout);

  if (basicValidated !== true) {
    return basicValidated;
  }

  const { userDetails, deliveryDetails } = arg as ValidCheckoutBody;

  const checks: (true | ErrorObject)[] = [
    validateUserDetails(userDetails),
    validateDeliveryDetails(deliveryDetails),
  ];

  if (checks.some(el => el !== true)) {
    return checks.filter(el => el !== true)[0];
  }

  const res = arg as ValidCheckoutBody;

  return getCheckout(res);
};

export { validateCheckoutBody, validateCartBody };
