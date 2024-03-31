interface Description {
  title: string;
  text: string[];
}

export type ProductDetails = {
  id: string;
  category: 'phones' | 'tablets' | 'accessories',
  name: string;
  namespaceId: string;
  capacityAvailable: string[];
  capacity: string;
  images: string[];
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  screen: string;
  resolution: string;
  ram: string;
  processor: string;
  camera?: string;
  zoom?: string;
  cell: string[];
  description: Description[];
};
