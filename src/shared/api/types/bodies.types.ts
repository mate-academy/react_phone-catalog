import { Category } from '@shared/types';
import { DeliveryTypes, Months, PerPage, SortOrder } from './bodies.enums';

// subtypes

type Birthday = {
  day: number;
  month: Months;
  year: number;
};

type UserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  birthday?: Birthday;
};

type Address = {
  country: string;
  city: string;
  postalCode: string;
  street: string;
  buildingNumber: string;
  apartment?: string;
};

type Pickup = {
  type: DeliveryTypes.PICKUP;
};

interface Shipment {
  type: Exclude<DeliveryTypes, DeliveryTypes.PICKUP>;
  deliveryAddress: Address;
}

type CartItem = {
  id: string;
  amount: number;
};

//actually bodies

interface AmountBody {
  category: Category;
}

interface CatalogueBody extends AmountBody {
  sort: SortOrder;
  perPage: PerPage;
  page: number;
}

interface ProdBody {
  itemId: string;
}

interface CartBody {
  cartItems: {
    id: string;
    amount: number;
  }[];
}

interface CheckoutBody {
  userDetails: UserDetails;
  deliveryDetails: Pickup | Shipment;
  dataProcessingAgreement: true;
}

export {
  type AmountBody,
  type CatalogueBody,
  type ProdBody,
  type CartBody,
  type CheckoutBody,
  type CartItem,
  type UserDetails,
  type Birthday,
  type Pickup,
  type Shipment,
  type Address,
};
