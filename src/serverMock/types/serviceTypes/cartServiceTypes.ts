import { DeliveryTypes, Months } from '@server/static';
import { ErrorObject, Product } from '..';

interface CartItem {
  id: string;
  amount: number;
}

interface BECartItem {
  product: Product;
  amount: number;
}

interface CartData {
  products: BECartItem[];
  errors: { id: string; error: ErrorObject }[];
}

interface Address {
  country: string;
  city: string;
  postalCode: number;
  street: string;
  buildingNumber: string;
  apartment?: number;
}

interface Birthday {
  day: number;
  month: Months;
  year: number;
}

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  birthday?: Birthday;
}

interface Pickup {
  type: DeliveryTypes.PICKUP;
}

interface Shipment {
  type: Exclude<DeliveryTypes, DeliveryTypes.PICKUP>;
  deliveryAddress: Address;
}

export {
  type CartItem,
  type BECartItem,
  type CartData,
  type Address,
  type Birthday,
  type UserDetails,
  type Pickup,
  type Shipment,
};
