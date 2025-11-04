import {
  ValidationResult,
  ValidCartBody,
  ValidCheckoutBody,
} from '../../types';
import {
  validateCartItem,
  validateDeliveryDetails,
  validateUserDetails,
} from '../validationHelpers';
import { basicValidation } from './basicBodyValidation';

const validShapes = {
  checkout: {
    items: 'array',
    userDetails: 'object',
    deliveryDetails: 'object',
    dataProcessingAgreement: 'boolean',
  },
};

const validateCartBody = (arg: unknown): ValidationResult<ValidCartBody> => {
  if (!Array.isArray(arg)) {
    return { ok: false, value: [422, `Invalid field types: ${arg}`] };
  }

  const check = arg.map(el => validateCartItem(el));

  if (check.some(el => !el.ok)) {
    return check.filter(el => !el.ok)[0];
  }

  return { ok: true, value: { items: arg } as ValidCartBody };
};

const validateCheckoutBody = (
  arg: unknown,
): ValidationResult<ValidCheckoutBody> => {
  const basicValidated = basicValidation(arg, validShapes.checkout);

  if (!basicValidated.ok) {
    return basicValidated;
  }

  const { items, userDetails, deliveryDetails } = arg as ValidCheckoutBody;

  const checks = [
    validateCartBody(items),
    validateUserDetails(userDetails),
    validateDeliveryDetails(deliveryDetails),
  ];

  if (checks.some(el => !el.ok)) {
    return checks.filter(el => !el.ok)[0];
  }

  return { ok: true, value: arg as ValidCheckoutBody };
};

export { validateCheckoutBody, validateCartBody };
