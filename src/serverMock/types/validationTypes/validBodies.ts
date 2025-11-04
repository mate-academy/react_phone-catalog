import { ItemsOnPage, OrderParams, ServerCategory } from '@server/static';
import { CartItem, Pickup, Shipment, UserDetails } from '..';

interface ValidCatalogueBody {
  itemType: ServerCategory;
  sort: OrderParams;
  perPage: ItemsOnPage;
  page: number;
}

interface ValidAmountBody {
  category: ServerCategory;
}

interface ValidProdBody {
  itemId: string;
}

interface ValidCartBody {
  items: CartItem[];
}

interface ValidCheckoutBody extends ValidCartBody {
  userDetails: UserDetails;
  deliveryDetails: Pickup | Shipment;
  dataProcessingAgreement: boolean;
}

export {
  type ValidCatalogueBody,
  type ValidCartBody,
  type ValidProdBody,
  type ValidAmountBody,
  type ValidCheckoutBody,
};
