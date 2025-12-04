import {
  Address,
  Birthday,
  Months,
  UserDetails,
  ValidCheckoutBody,
} from '@server/types';
import { EdgeCasesKeys } from '@server/types';
import { cartBodySchema } from './body.schema';

const checkoutBodySchema = {
  ...cartBodySchema,
  [EdgeCasesKeys.USER_DETAILS]: {},
  [EdgeCasesKeys.DELIVERY_DETAILS]: {},
  dataProcessingAgreement: true,
} as ValidCheckoutBody;

const userDetailsSchema: UserDetails = {
  firstName: '',
  lastName: '',
  email: '',
  tel: '',
};

const birthdayShape: Birthday = {
  day: 1,
  month: Months.APR,
  year: 1,
};

const userDetailsOptionsSchema = {
  [EdgeCasesKeys.BIRTHDAY]: birthdayShape,
};

const addressShape: Address = {
  country: '',
  city: '',
  postalCode: '',
  street: '',
  buildingNumber: '',
};

const addressOptionsShape = {
  apartment: 0,
};

export {
  checkoutBodySchema,
  userDetailsSchema,
  birthdayShape,
  userDetailsOptionsSchema,
  addressShape,
  addressOptionsShape,
};
