import { days, Months } from '@server/static';
import {
  ADDRESS_LENGTH,
  BDAY_LENGTH,
  Birthday,
  CartItem,
  DeliveryTypes,
  Pickup,
  Shipment,
  USER_DETAILS_LENGTH,
  UserDetails,
  ValidCartBody,
  ValidCheckoutBody,
} from '@server/types';
import { VALID_CHECKOUT_BODY_LENGTH } from '@server/types/requestTypes';

const validateCartItem = (arg: unknown): arg is CartItem => {
  if (typeof arg !== 'object' || arg === null) {
    return false;
  }

  if (Object.keys(arg).length !== 2 || !('id' in arg) || !('amount' in arg)) {
    return false;
  }

  if (
    typeof arg.id !== 'string' ||
    typeof arg.amount !== 'number' ||
    arg.amount < 1
  ) {
    return false;
  }

  return true;
};

const validateCartBody = (arg: unknown): arg is ValidCartBody => {
  if (!Array.isArray(arg)) {
    return false;
  }

  return arg.every(el => validateCartItem(el));
};

const validateMonth = (arg: unknown): arg is Months => {
  return (
    typeof arg === 'string' && Object.values(Months).some(el => el === arg)
  );
};

const validateDay = (day: unknown, month: Months) => {
  if (typeof day !== 'number' || isNaN(day)) {
    return false;
  }

  return day > 0 && day < days[month];
};

const validateYear = (arg: unknown): arg is number => {
  if (typeof arg !== 'number') {
    return false;
  }

  const currentYear = new Date().getFullYear();

  return arg < currentYear && arg > currentYear - 100;
};

const validateBirthday = (arg: unknown): arg is Birthday => {
  if (typeof arg !== 'object' || arg === null) {
    return false;
  }

  if (
    Object.keys(arg).length !== BDAY_LENGTH ||
    !('day' in arg) ||
    !('month' in arg) ||
    !('year' in arg)
  ) {
    return false;
  }

  if (
    !validateMonth(arg.month) ||
    !validateDay(arg.day, arg.month) ||
    !validateYear(arg.year)
  ) {
    return false;
  }

  return true;
};

const validateUserDetails = (arg: unknown): arg is UserDetails => {
  if (typeof arg !== 'object' || arg === null) {
    return false;
  }

  const length = Object.keys(arg).length;

  if (
    length < USER_DETAILS_LENGTH - 1 ||
    length > USER_DETAILS_LENGTH ||
    !('firstName' in arg) ||
    !('lastName' in arg) ||
    !('email' in arg) ||
    !('phone' in arg)
  ) {
    return false;
  }

  const isStrings = [arg.firstName, arg.lastName, arg.email, arg.phone].every(
    el => typeof el === 'string',
  );

  if (!isStrings) {
    return false;
  }

  if (length === USER_DETAILS_LENGTH) {
    return 'birthday' in arg && validateBirthday(arg.birthday);
  }

  return true;
};

const validateDeliveryDetails = (arg: unknown): arg is Pickup | Shipment => {
  if (typeof arg !== 'object' || arg === null) {
    return false;
  }

  if (!('type' in arg)) {
    return false;
  }

  if (!Object.values(DeliveryTypes).some(el => el === arg.type)) {
    return false;
  }

  if (arg.type === DeliveryTypes.PICKUP) {
    return Object.keys(arg).length === 1;
  }

  if (
    !('deliveryAddress' in arg) ||
    typeof arg.deliveryAddress !== 'object' ||
    arg.deliveryAddress === null
  ) {
    return false;
  }

  const address = arg.deliveryAddress;

  if (
    Object.keys(address).length < ADDRESS_LENGTH - 1 ||
    Object.keys(address).length > ADDRESS_LENGTH ||
    !('country' in address) ||
    !('city' in address) ||
    !('postalCode' in address) ||
    !('street' in address) ||
    !('buildingNumber' in address)
  ) {
    return false;
  }

  const { country, city, postalCode, street, buildingNumber } = address;
  const strings = [country, city, street, buildingNumber];

  if (
    !strings.every(el => typeof el === 'string') ||
    typeof postalCode !== 'number'
  ) {
    return false;
  }

  if (Object.keys(address).length === ADDRESS_LENGTH - 1) {
    return true;
  }

  if (Object.keys(address).length === ADDRESS_LENGTH) {
    return 'apartment' in address && typeof address.apartment === 'number';
  }

  return true;
};

const validateCheckoutBody = (arg: unknown): arg is ValidCheckoutBody => {
  if (typeof arg !== 'object' || arg === null) {
    return false;
  }

  if (
    Object.keys(arg).length !== VALID_CHECKOUT_BODY_LENGTH ||
    !('items' in arg) ||
    !('userDetails' in arg) ||
    !('deliveryDetails' in arg) ||
    !('dataProcessingAgreement' in arg)
  ) {
    return false;
  }

  const { items, userDetails, deliveryDetails, dataProcessingAgreement } = arg;

  if (
    !validateCartBody(items) ||
    !validateUserDetails(userDetails) ||
    !validateDeliveryDetails(deliveryDetails) ||
    typeof dataProcessingAgreement !== 'boolean'
  ) {
    return false;
  }

  return true;
};

export { validateCheckoutBody, validateCartBody };
