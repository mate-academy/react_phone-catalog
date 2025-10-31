type CartItem = {
  id: string;
  amount: number;
};

interface Address {
  country: string;
  city: string;
  postalCode: number;
  street: string;
  buildingNumber: string;
  apartment?: string;
}

enum DeliveryTypes {
  PICKUP = 'pickup',
  DPD = 'dpd',
  UPS = 'ups standard',
}

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
}

interface Pickup {
  type: DeliveryTypes.PICKUP;
}

interface Shipment {
  type: Exclude<DeliveryTypes, DeliveryTypes.PICKUP>;
  deliveryAddress: Address;
}

export { type Shipment, type Pickup, type UserDetails, type CartItem };
