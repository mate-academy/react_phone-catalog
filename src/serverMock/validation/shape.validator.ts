import {
  ValidAmountBody,
  ValidCartBody,
  ValidCheckoutBody,
  ValidProdBody,
  EdgeCasesKeys,
  ProcessingResult,
  ValidCatalogueBody,
  Address,
  Birthday,
  CartItem,
  UserDetails,
} from '@server/types';
import { isValidObject, validateKeys } from './helpers/helpers.validator';
import { edgeCases } from './edgeCaseRouter';
import { formError } from '@server/helpers';

type ValidT =
  | ValidAmountBody
  | ValidCatalogueBody
  | ValidProdBody
  | ValidCartBody
  | ValidCheckoutBody
  | CartItem
  | Address
  | Birthday
  | UserDetails;

export const shapeValidator = <T extends ValidT>(
  body: unknown,
  shape: T,
  option?: Record<string, unknown>,
): ProcessingResult<T> => {
  if (!isValidObject(body)) {
    return formError(400, `Body must be a string-indexed object: ${body}`);
  }

  const bodyKeys = Object.keys(body);
  const shapeKeys = Object.keys(shape);

  const validatedObligateKeys = validateKeys(bodyKeys, shapeKeys);

  if (!validatedObligateKeys.ok) {
    return validatedObligateKeys;
  }

  if (!option && bodyKeys.length !== shapeKeys.length) {
    const unexpectedKeys = bodyKeys.filter(el => !shapeKeys.includes(el));

    return formError(422, `Unexpected body keys: ${unexpectedKeys}`);
  }

  if (option) {
    const optional = bodyKeys.filter(key => !shapeKeys.includes(key));
    const template = Object.keys(option);

    const validOptionalKeys = validateKeys(optional, template, false);

    if (!validOptionalKeys.ok) {
      return validOptionalKeys;
    }
  }

  for (const key of bodyKeys) {
    if (Object.values(EdgeCasesKeys).includes(key as EdgeCasesKeys)) {
      if (!edgeCases[key as EdgeCasesKeys](body[key])) {
        return formError(422, `Unexpected body values: ${body[key]}`);
      }

      continue;
    }

    if (typeof body[key] !== typeof shape[key as keyof T]) {
      return formError(422, `Unexpected body values: ${body[key]}`);
    }
  }

  return { ok: true, data: body as T };
};
