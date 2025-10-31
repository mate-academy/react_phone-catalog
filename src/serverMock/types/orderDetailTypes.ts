import { Months } from '@server/static';

type CartItem = {
  id: string;
  amount: number;
};

const ADDRESS_LENGTH = 6;

interface Address {
  country: string;
  city: string;
  postalCode: number;
  street: string;
  buildingNumber: string;
  apartment?: number;
}

enum DeliveryTypes {
  PICKUP = 'pickup',
  DPD = 'dpd',
  UPS = 'ups standard',
}

const BDAY_LENGTH = 3;

interface Birthday {
  day: number;
  month: Months;
  year: number;
}

const USER_DETAILS_LENGTH = 5;

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
  type Shipment,
  type Pickup,
  type UserDetails,
  type CartItem,
  type Birthday,
  DeliveryTypes,
  USER_DETAILS_LENGTH,
  BDAY_LENGTH,
  ADDRESS_LENGTH,
};
