export interface Phones {
  id: string;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface Phone {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: [
    {
      title: string;
      text: string[];
    },
    {
      title: string;
      text: string[];
    },
    {
      title: string;
      text: string[];
    }
  ];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export interface PhoneOfPhones {
  id: string;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}
