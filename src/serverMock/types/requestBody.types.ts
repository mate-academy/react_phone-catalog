import {
  PerPage,
  SortParams,
  ProductCategory,
  EdgeCasesKeys,
} from './request.enums';
import { CartItem, Pickup, Shipment, UserDetails } from './types';

interface ValidAmountBody {
  [EdgeCasesKeys.CATEGORY]: ProductCategory;
}

interface ValidCatalogueBody extends ValidAmountBody {
  [EdgeCasesKeys.SORT]: SortParams;
  [EdgeCasesKeys.PER_PAGE]: PerPage;
  [EdgeCasesKeys.PAGE]: number;
}

interface ValidProdBody {
  itemId: string;
}

interface ValidCartBody {
  cartItems: CartItem[];
}

interface ValidCheckoutBody extends ValidCartBody {
  [EdgeCasesKeys.USER_DETAILS]: UserDetails;
  [EdgeCasesKeys.DELIVERY_DETAILS]: Pickup | Shipment;
  dataProcessingAgreement: boolean;
}

export {
  type ValidCatalogueBody,
  type ValidCartBody,
  type ValidProdBody,
  type ValidAmountBody,
  type ValidCheckoutBody,
};
