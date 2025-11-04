import { Birthday, DeliveryTypes, ValidationCheck } from '@server/types';
import { validateDay, validateMonth, validateYear } from '.';
import { basicValidation } from '../validateBody';

const validShapes = {
  cart: {
    id: 'string',
    amount: 'number',
  },
  birthday: {
    day: 'number',
    month: 'string',
    year: 'number',
  },
  userDetails: {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    tel: 'string',
  },
  userDetailsOptions: {
    birthday: 'object',
  },
  delivery: {
    type: 'string',
  },
  deliveryOptional: {
    deliveryAddress: 'object',
  },
  address: {
    country: 'string',
    city: 'string',
    postalCode: 'number',
    street: 'string',
    buildingNumber: 'string',
  },
  addressOptional: {
    apartment: 'number',
  },
};

const validateCartItem = (arg: unknown): ValidationCheck => {
  const basicValidated = basicValidation(arg, validShapes.cart);

  if (!basicValidated.ok) {
    return basicValidated;
  }

  return { ok: true };
};

const validateBirthday = (arg: unknown): ValidationCheck => {
  const basicValidated = basicValidation(arg, validShapes.birthday);

  if (!basicValidated.ok) {
    return basicValidated;
  }

  const { day, month, year } = arg as Birthday;
  const validDate = [
    validateMonth(month),
    validateDay(day, month),
    validateYear(year),
  ];

  if (validDate.some(el => el.ok !== true)) {
    return validDate.filter(el => el.ok !== true)[0];
  }

  return { ok: true };
};

const validateUserDetails = (arg: unknown): ValidationCheck => {
  const basicValidated = basicValidation(
    arg,
    validShapes.userDetails,
    validShapes.userDetailsOptions,
  );

  if (!basicValidated.ok) {
    return basicValidated;
  }

  if (Object.hasOwn(arg as Record<string, unknown>, 'birthday')) {
    const check = validateBirthday((arg as Record<string, unknown>).birthday);

    if (!check.ok) {
      return check;
    }
  }

  return { ok: true };
};

const validateAddress = (arg: unknown): ValidationCheck => {
  const basicValidated = basicValidation(
    arg,
    validShapes.address,
    validShapes.addressOptional,
  );

  if (!basicValidated.ok) {
    return basicValidated;
  }

  return { ok: true };
};

const validateDeliveryDetails = (arg: unknown): ValidationCheck => {
  const basicValidated = basicValidation(
    arg,
    validShapes.address,
    validShapes.addressOptional,
  );

  if (!basicValidated.ok) {
    return basicValidated;
  }

  if (
    !Object.values(DeliveryTypes).some(
      el => el === (arg as Record<string, unknown>).type,
    )
  ) {
    return {
      ok: false,
      value: [422, `Invalid field values: ${arg}`],
    };
  }

  if ((arg as Record<string, unknown>).type === DeliveryTypes.PICKUP) {
    return { ok: true };
  }

  const { deliveryAddress } = arg as Record<string, unknown>;

  return validateAddress(deliveryAddress);
};

export {
  validateCartItem,
  validateBirthday,
  validateUserDetails,
  validateAddress,
  validateDeliveryDetails,
};
