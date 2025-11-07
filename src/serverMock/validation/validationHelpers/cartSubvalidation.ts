import { Birthday, ErrorObject } from '../../types';
import { basicValidation, validateDay, validateMonth, validateYear } from '.';
import { DeliveryTypes } from '../../static';
import { createError } from '@server/helpers';

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

const validateCartItem = (arg: unknown) => {
  const basicValidated = basicValidation(arg, validShapes.cart);

  if (basicValidated !== true) {
    return basicValidated;
  }

  return true;
};

const validateBirthday = (arg: unknown) => {
  const basicValidated = basicValidation(arg, validShapes.birthday);

  if (basicValidated !== true) {
    return basicValidated;
  }

  const { day, month, year } = arg as Birthday;
  const validDate: (true | ErrorObject)[] = [
    validateMonth(month),
    validateDay(day, month),
    validateYear(year),
  ];

  if (!validDate.every(el => el === true)) {
    return validDate.filter(el => el !== true)[0];
  }

  return true;
};

const validateUserDetails = (arg: unknown) => {
  const basicValidated = basicValidation(
    arg,
    validShapes.userDetails,
    validShapes.userDetailsOptions,
  );

  if (basicValidated !== true) {
    return basicValidated;
  }

  if (Object.hasOwn(arg as Record<string, unknown>, 'birthday')) {
    const check = validateBirthday((arg as Record<string, unknown>).birthday);

    if (check !== true) {
      return check;
    }
  }

  return true;
};

const validateAddress = (arg: unknown) => {
  const basicValidated = basicValidation(
    arg,
    validShapes.address,
    validShapes.addressOptional,
  );

  if (basicValidated !== true) {
    return basicValidated;
  }

  return true;
};

const validateDeliveryDetails = (arg: unknown) => {
  const basicValidated = basicValidation(
    arg,
    validShapes.address,
    validShapes.addressOptional,
  );

  if (basicValidated !== true) {
    return basicValidated;
  }

  if (
    !Object.values(DeliveryTypes).some(
      el => el === (arg as Record<string, unknown>).type,
    )
  ) {
    return createError(422, `Invalid field values: ${arg}`);
  }

  if ((arg as Record<string, unknown>).type === DeliveryTypes.PICKUP) {
    return true;
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
