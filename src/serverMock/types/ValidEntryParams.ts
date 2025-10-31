import {
  ServerCategory,
  ItemsOnPage,
  OrderParams,
  UserDetails,
  Pickup,
  Shipment,
  CartItem,
} from '.';

interface ValidCatalogueParams {
  itemType: ServerCategory;
  sort: OrderParams;
  perPage: ItemsOnPage;
  page: number;
}

interface ValidAmountParams {
  category: ServerCategory;
}

interface ValidProdParams {
  itemId: string;
}

interface ValidCartParams {
  items: CartItem[];
}

interface ValidCheckoutParams extends ValidCartParams {
  userDetails: UserDetails;
  deliveryDetails: Pickup | Shipment;
  dataProcessingAgreement: boolean;
}

type ValidParams = ValidCatalogueParams | ValidAmountParams | ValidProdParams;

export {
  type ValidCatalogueParams,
  type ValidProdParams,
  type ValidParams,
  type ValidAmountParams,
  type ValidCheckoutParams,
};
