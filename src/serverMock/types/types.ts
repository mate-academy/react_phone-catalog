import { ErrorObject, Product } from '.';
import { DeliveryTypes } from './request.enums';

enum Months {
  JAN = 1,
  FEB = 2,
  MAR = 3,
  APR = 4,
  MAY = 5,
  JUN = 6,
  JUL = 7,
  AUG = 8,
  SEP = 9,
  OCT = 10,
  NOV = 11,
  DEC = 12,
}

interface Address {
  country: string;
  city: string;
  postalCode: string;
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

interface CartItem {
  id: string;
  amount: number;
}

interface BECartItem {
  product: Product;
  amount: number;
  total: number;
}

interface CartData {
  products: BECartItem[];
  errors: { id: string; error: ErrorObject }[];
}

export {
  Months,
  type Address,
  type Birthday,
  type UserDetails,
  type Pickup,
  type Shipment,
  type CartItem,
  type BECartItem,
  type CartData,
};
