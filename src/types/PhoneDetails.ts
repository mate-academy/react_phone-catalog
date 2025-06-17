// Тип для детального перегляду з phones.json, tablets.json, accessories.json
export type PhoneDetails = {
  id: string;
  namespaceId: string;
  name: string;
  color: string;
  colorsAvailable: string[];
  images: string[];
  capacity: string;
  capacityAvailable: string[];
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  description: { title: string; text: string[] }[];
};
