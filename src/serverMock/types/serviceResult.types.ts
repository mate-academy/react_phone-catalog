import {
  ValidAmountBody,
  ValidCartBody,
  ValidCatalogueBody,
  ValidCheckoutBody,
  ValidProdBody,
} from '.';

type ValidServiceBodies =
  | ValidAmountBody
  | ValidCatalogueBody
  | ValidProdBody
  | ValidCartBody
  | ValidCheckoutBody;

export { type ValidServiceBodies };
