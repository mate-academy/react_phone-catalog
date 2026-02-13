import { CartItem, DeliveryTypes, ValidatorResponce } from '../../types';
import { enumValidator, isValidObject } from './helpers.validator';
import { shapeValidator } from '../';
import {
  addressOptionsShape,
  addressShape,
  birthdayShape,
  userDetailsOptionsSchema,
  userDetailsSchema,
} from '../../schemas';
import { validateDay, validateMonth, validateYear } from './calendar.validator';
import { formError } from '@server/helpers';
import { products } from '@server/static';

const cartBodyCase = (test: unknown): ValidatorResponce => {
  const isEmptyArray = Array.isArray(test) && test.length === 0;

  if (isEmptyArray) {
    return formError(422, `Expected not empty array in 'items'`);
  }

  const cartItemShape: CartItem = {
    id: '',
    amount: 0,
  };

  const check = (test as unknown[]).map(el =>
    shapeValidator(el, cartItemShape),
  );

  const errors = check.filter(el => !el.ok);

  if (errors.length !== 0) {
    return errors[0];
  }

  const idCheck = (test as CartItem[]).filter(el =>
    products.every(it => it.id !== el.id),
  );

  if (idCheck.length !== 0) {
    return formError(404, `Unexpected itemId ${idCheck[0]}`);
  }

  return { ok: true };
};

const userDetailsCase = (test: unknown): ValidatorResponce => {
  const check = shapeValidator(
    test,
    userDetailsSchema,
    userDetailsOptionsSchema,
  );

  if (!check.ok) {
    return check;
  }

  return { ok: true };
};

const deliveryDetailsValidator = (test: unknown): ValidatorResponce => {
  if (!isValidObject(test)) {
    return formError(422, `deliveryDetails must be an object`);
  }

  if (!Object.hasOwn(test, 'type')) {
    return formError(422, `Missing delivery type in deliveryDetails`);
  }

  if (!enumValidator(test.type, Object.values(DeliveryTypes))) {
    return formError(
      422,
      `Expected delivery type to be one of values: ${Object.values(DeliveryTypes)}`,
    );
  }

  if (test.type === DeliveryTypes.PICKUP) {
    return { ok: true };
  }

  if (!Object.hasOwn(test, 'deliveryAddress')) {
    return formError(
      422,
      `Expected deliveryAddress fo delivery type ${test.type}`,
    );
  }

  const check = shapeValidator(
    test.deliveryAddress,
    addressShape,
    addressOptionsShape,
  );

  if (!check.ok) {
    return check;
  }

  return { ok: true };
};

const birthdayCase = (test: unknown): ValidatorResponce => {
  if (!isValidObject(test)) {
    return formError(422, `Birthday must be an object`);
  }

  const check = shapeValidator(test, birthdayShape);

  if (!check.ok) {
    return check;
  }

  if (!validateMonth(test.month)) {
    return formError(422, `Unexpected month value: ${test.month}`);
  }

  if (!validateYear(test.year)) {
    return formError(422, `Unexpected year value: ${test.year}`);
  }

  if (!validateDay(test.day, test.month)) {
    return formError(422, `Unexpected day value: ${test.day}`);
  }

  return { ok: true };
};

export {
  cartBodyCase,
  userDetailsCase,
  deliveryDetailsValidator,
  birthdayCase,
};
