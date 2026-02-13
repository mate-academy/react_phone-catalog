import { formError } from '@server/helpers';
import {
  EdgeCasesKeys,
  PerPage,
  ProductCategory,
  SortParams,
  ValidatorResponce,
} from '../types';
import {
  birthdayCase,
  cartBodyCase,
  deliveryDetailsValidator,
  userDetailsCase,
} from './helpers/edgeCase.validator';
import { enumValidator } from './helpers/helpers.validator';

type EdgeValid = Record<EdgeCasesKeys, (test: unknown) => ValidatorResponce>;

const edgeCases: EdgeValid = {
  [EdgeCasesKeys.CART_ITEMS]: cartBodyCase,
  [EdgeCasesKeys.CATEGORY]: (test: unknown): ValidatorResponce => {
    return enumValidator(test, Object.values(ProductCategory));
  },
  [EdgeCasesKeys.SORT]: (test: unknown): ValidatorResponce => {
    return enumValidator(test, Object.values(SortParams));
  },
  [EdgeCasesKeys.PER_PAGE]: (test: unknown): ValidatorResponce => {
    return enumValidator(test, Object.values(PerPage));
  },
  [EdgeCasesKeys.PAGE]: (test: unknown): ValidatorResponce => {
    const check = typeof test === 'number' && test > 0 && Number.isFinite(test);

    return check
      ? { ok: true }
      : formError(422, `Expected page to be positive number`);
  },
  [EdgeCasesKeys.USER_DETAILS]: userDetailsCase,
  [EdgeCasesKeys.DELIVERY_DETAILS]: deliveryDetailsValidator,
  [EdgeCasesKeys.BIRTHDAY]: birthdayCase,
};

export { edgeCases };
