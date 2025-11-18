import { ErrorObject, Product } from '.';
import { DeliveryTypes } from './request.enums';

enum Months {
  JAN = 'january',
  FEB = 'february',
  MAR = 'march',
  APR = 'april',
  MAY = 'may',
  JUN = 'june',
  JUL = 'july',
  AUG = 'august',
  SEP = 'september',
  OCT = 'october',
  NOV = 'november',
  DEC = 'december',
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
